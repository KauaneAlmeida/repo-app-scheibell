"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MedicationsService = class MedicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logMedication(patientId, dto) {
        const takenAt = dto.takenAt ? new Date(dto.takenAt) : new Date();
        return this.prisma.medicationLog.create({
            data: {
                patientId,
                contentId: dto.contentId,
                scheduledTime: dto.scheduledTime,
                takenAt,
            },
        });
    }
    async getMedicationLogs(patientId, options) {
        const where = { patientId };
        if (options?.contentId) {
            where.contentId = options.contentId;
        }
        if (options?.startDate || options?.endDate) {
            where.takenAt = {};
            if (options?.startDate) {
                where.takenAt.gte = options.startDate;
            }
            if (options?.endDate) {
                where.takenAt.lte = options.endDate;
            }
        }
        return this.prisma.medicationLog.findMany({
            where,
            orderBy: { takenAt: 'desc' },
            take: options?.limit || 100,
        });
    }
    async getTodayLogs(patientId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.prisma.medicationLog.findMany({
            where: {
                patientId,
                takenAt: {
                    gte: today,
                    lt: tomorrow,
                },
            },
            orderBy: { takenAt: 'desc' },
        });
    }
    async getAdherence(patientId, options) {
        const days = options?.days || 7;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            select: { clinicId: true, surgeryDate: true },
        });
        if (!patient) {
            return { adherence: 0, taken: 0, expected: 0 };
        }
        const medications = await this.prisma.clinicContent.findMany({
            where: {
                clinicId: patient.clinicId,
                type: 'MEDICATIONS',
                isActive: true,
            },
        });
        if (medications.length === 0) {
            return { adherence: 100, taken: 0, expected: 0 };
        }
        const logs = await this.prisma.medicationLog.count({
            where: {
                patientId,
                takenAt: {
                    gte: startDate,
                },
            },
        });
        const expected = medications.length * days;
        const adherence = expected > 0 ? Math.min(100, Math.round((logs / expected) * 100)) : 100;
        return {
            adherence,
            taken: logs,
            expected,
            days,
            medicationsCount: medications.length,
        };
    }
    async wasTakenToday(patientId, contentId, scheduledTime) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const log = await this.prisma.medicationLog.findFirst({
            where: {
                patientId,
                contentId,
                scheduledTime,
                takenAt: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });
        return !!log;
    }
    async undoLog(patientId, logId) {
        const log = await this.prisma.medicationLog.findFirst({
            where: {
                id: logId,
                patientId,
            },
        });
        if (!log) {
            return null;
        }
        return this.prisma.medicationLog.delete({
            where: { id: logId },
        });
    }
};
exports.MedicationsService = MedicationsService;
exports.MedicationsService = MedicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicationsService);
//# sourceMappingURL=medications.service.js.map