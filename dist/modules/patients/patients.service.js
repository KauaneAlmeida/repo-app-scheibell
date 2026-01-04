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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let PatientsService = class PatientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateDaysPostOp(surgeryDate) {
        if (!surgeryDate)
            return null;
        const today = new Date();
        const surgery = new Date(surgeryDate);
        const diffTime = today.getTime() - surgery.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 ? diffDays : null;
    }
    async findAllByClinic(clinicId, filters) {
        const where = { clinicId };
        if (filters.search) {
            where.user = {
                OR: [
                    { name: { contains: filters.search, mode: 'insensitive' } },
                    { email: { contains: filters.search, mode: 'insensitive' } },
                ],
            };
        }
        if (filters.surgeryType) {
            where.surgeryType = filters.surgeryType;
        }
        const patients = await this.prisma.patient.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const patientsWithStats = patients.map((patient) => ({
            id: patient.id,
            userId: patient.userId,
            name: patient.user.name,
            email: patient.user.email,
            phone: patient.phone,
            cpf: patient.cpf,
            birthDate: patient.birthDate,
            surgeryDate: patient.surgeryDate,
            surgeryType: patient.surgeryType,
            daysPostOp: this.calculateDaysPostOp(patient.surgeryDate),
            clinicId: patient.clinicId,
            createdAt: patient.createdAt,
        }));
        return {
            patients: patientsWithStats,
            total: patientsWithStats.length,
        };
    }
    async findOne(id) {
        const patient = await this.prisma.patient.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                clinic: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                contentAdjustments: {
                    where: { isActive: true },
                    include: {
                        baseContent: true,
                    },
                },
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente não encontrado');
        }
        return {
            ...patient,
            name: patient.user.name,
            email: patient.user.email,
            daysPostOp: this.calculateDaysPostOp(patient.surgeryDate),
        };
    }
    async create(clinicId, dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email já está em uso');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const passwordHash = await bcrypt.hash(dto.password || '123456', 10);
            const user = await tx.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    passwordHash,
                    role: 'PATIENT',
                    clinicId,
                },
            });
            const patient = await tx.patient.create({
                data: {
                    userId: user.id,
                    clinicId,
                    cpf: dto.cpf,
                    phone: dto.phone,
                    birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
                    surgeryDate: dto.surgeryDate ? new Date(dto.surgeryDate) : null,
                    surgeryType: dto.surgeryType,
                },
                include: {
                    user: {
                        select: { id: true, name: true, email: true },
                    },
                },
            });
            return patient;
        });
        return {
            ...result,
            name: result.user.name,
            email: result.user.email,
            daysPostOp: this.calculateDaysPostOp(result.surgeryDate),
        };
    }
    async update(id, dto) {
        const patient = await this.prisma.patient.update({
            where: { id },
            data: {
                cpf: dto.cpf,
                phone: dto.phone,
                birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
                surgeryDate: dto.surgeryDate ? new Date(dto.surgeryDate) : undefined,
                surgeryType: dto.surgeryType,
                user: dto.name
                    ? {
                        update: { name: dto.name },
                    }
                    : undefined,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        return {
            ...patient,
            name: patient.user.name,
            email: patient.user.email,
            daysPostOp: this.calculateDaysPostOp(patient.surgeryDate),
        };
    }
    async getPatientStats(patientId) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                medicationLogs: {
                    where: {
                        takenAt: {
                            gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                        },
                    },
                },
                appointments: {
                    where: { status: 'COMPLETED' },
                },
                contentAdjustments: {
                    where: { isActive: true },
                },
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente não encontrado');
        }
        const daysPostOp = this.calculateDaysPostOp(patient.surgeryDate);
        return {
            daysPostOp,
            medicationsTakenLast7Days: patient.medicationLogs.length,
            completedAppointments: patient.appointments.length,
            activeAdjustments: patient.contentAdjustments.length,
        };
    }
    async getSurgeryTypes(clinicId) {
        const patients = await this.prisma.patient.findMany({
            where: { clinicId, surgeryType: { not: null } },
            select: { surgeryType: true },
            distinct: ['surgeryType'],
        });
        return patients.map((p) => p.surgeryType).filter(Boolean);
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map