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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentsService = class AppointmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatientAppointments(patientId, status) {
        const where = { patientId };
        if (status) {
            where.status = status;
        }
        return this.prisma.appointment.findMany({
            where,
            orderBy: { date: 'asc' },
        });
    }
    async getUpcomingAppointments(patientId, limit = 5) {
        return this.prisma.appointment.findMany({
            where: {
                patientId,
                status: { not: client_1.AppointmentStatus.CANCELLED },
                date: { gte: new Date() },
            },
            orderBy: { date: 'asc' },
            take: limit,
        });
    }
    async getAppointmentById(id, patientId) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Consulta não encontrada');
        }
        if (appointment.patientId !== patientId) {
            throw new common_1.ForbiddenException('Acesso negado a esta consulta');
        }
        return appointment;
    }
    async createAppointment(patientId, dto) {
        return this.prisma.appointment.create({
            data: {
                patientId,
                title: dto.title,
                description: dto.description,
                date: new Date(dto.date),
                time: dto.time,
                type: dto.type,
                location: dto.location,
                notes: dto.notes,
                status: client_1.AppointmentStatus.PENDING,
            },
        });
    }
    async updateStatus(id, patientId, dto) {
        await this.getAppointmentById(id, patientId);
        return this.prisma.appointment.update({
            where: { id },
            data: { status: dto.status },
        });
    }
    async cancelAppointment(id, patientId) {
        return this.updateStatus(id, patientId, { status: client_1.AppointmentStatus.CANCELLED });
    }
    async confirmAppointment(id, patientId) {
        return this.updateStatus(id, patientId, { status: client_1.AppointmentStatus.CONFIRMED });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map