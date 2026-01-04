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
exports.TrainingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TrainingService = class TrainingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTrainingDashboard(patientId) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            select: { surgeryDate: true, clinicId: true },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente não encontrado');
        }
        if (!patient.surgeryDate) {
            throw new common_1.BadRequestException('Data de cirurgia não definida');
        }
        const now = new Date();
        const surgeryDate = new Date(patient.surgeryDate);
        const daysSinceSurgery = Math.floor((now.getTime() - surgeryDate.getTime()) / (1000 * 60 * 60 * 24));
        const currentWeekNumber = Math.max(1, Math.floor(daysSinceSurgery / 7) + 1);
        let protocol = await this.prisma.trainingProtocol.findFirst({
            where: {
                clinicId: patient.clinicId,
                isActive: true,
            },
            include: {
                weeks: {
                    orderBy: { weekNumber: 'asc' },
                    include: {
                        sessions: { orderBy: { sessionNumber: 'asc' } },
                    },
                },
            },
        });
        if (!protocol) {
            protocol = await this.prisma.trainingProtocol.findFirst({
                where: { isDefault: true, isActive: true },
                include: {
                    weeks: {
                        orderBy: { weekNumber: 'asc' },
                        include: {
                            sessions: { orderBy: { sessionNumber: 'asc' } },
                        },
                    },
                },
            });
        }
        if (!protocol) {
            throw new common_1.NotFoundException('Protocolo de treino não encontrado');
        }
        await this.ensurePatientProgress(patientId, protocol.id, currentWeekNumber);
        const patientProgress = await this.prisma.patientTrainingProgress.findMany({
            where: { patientId },
            include: { week: true },
        });
        const completedSessions = await this.prisma.patientSessionCompletion.findMany({
            where: { patientId },
            select: { sessionId: true },
        });
        const completedSessionIds = new Set(completedSessions.map((s) => s.sessionId));
        const totalWeeks = protocol.weeks.length;
        const completedWeeks = patientProgress.filter((p) => p.status === client_1.TrainingWeekStatus.COMPLETED).length;
        const progressPercent = Math.round((completedWeeks / totalWeeks) * 100);
        const weeks = protocol.weeks.map((week) => {
            const progress = patientProgress.find((p) => p.weekId === week.id);
            let status;
            if (week.weekNumber < currentWeekNumber) {
                status = 'COMPLETED';
            }
            else if (week.weekNumber === currentWeekNumber) {
                status = 'CURRENT';
            }
            else {
                status = 'FUTURE';
            }
            const sessions = week.sessions.map((session) => ({
                id: session.id,
                sessionNumber: session.sessionNumber,
                name: session.name,
                description: session.description,
                duration: session.duration,
                intensity: session.intensity,
                completed: completedSessionIds.has(session.id),
            }));
            const completedSessionsCount = sessions.filter((s) => s.completed).length;
            return {
                id: week.id,
                weekNumber: week.weekNumber,
                title: week.title,
                dayRange: week.dayRange,
                objective: week.objective,
                maxHeartRate: week.maxHeartRate,
                heartRateLabel: week.heartRateLabel,
                canDo: week.canDo,
                avoid: week.avoid,
                status,
                sessions,
                totalSessions: sessions.length,
                completedSessions: completedSessionsCount,
                sessionProgress: sessions.length > 0
                    ? Math.round((completedSessionsCount / sessions.length) * 100)
                    : 0,
            };
        });
        const currentWeek = weeks.find((w) => w.weekNumber === currentWeekNumber);
        return {
            protocol: {
                id: protocol.id,
                name: protocol.name,
                totalWeeks: protocol.totalWeeks,
            },
            daysSinceSurgery,
            currentWeek: Math.min(currentWeekNumber, protocol.totalWeeks),
            basalHeartRate: 65,
            progressPercent,
            completedWeeks,
            totalWeeks,
            weeks,
            currentWeekDetails: currentWeek || null,
        };
    }
    async getTrainingProtocol(patientId) {
        const dashboard = await this.getTrainingDashboard(patientId);
        return {
            currentWeek: dashboard.currentWeek,
            daysSinceSurgery: dashboard.daysSinceSurgery,
            basalHeartRate: dashboard.basalHeartRate,
            weeks: dashboard.weeks.map((week) => ({
                weekNumber: week.weekNumber,
                title: week.title,
                dayRange: week.dayRange,
                status: week.status,
                objective: week.objective,
                maxHeartRate: week.maxHeartRate,
                heartRateLabel: week.heartRateLabel,
                canDo: week.canDo,
                avoid: week.avoid,
            })),
        };
    }
    async completeSession(patientId, sessionId, notes) {
        const session = await this.prisma.trainingSession.findUnique({
            where: { id: sessionId },
            include: { week: true },
        });
        if (!session) {
            throw new common_1.NotFoundException('Sessão não encontrada');
        }
        const existing = await this.prisma.patientSessionCompletion.findUnique({
            where: {
                patientId_sessionId: {
                    patientId,
                    sessionId,
                },
            },
        });
        if (existing) {
            if (notes) {
                await this.prisma.patientSessionCompletion.update({
                    where: { id: existing.id },
                    data: { notes },
                });
            }
            return { message: 'Sessão já marcada como concluída', alreadyCompleted: true };
        }
        await this.prisma.patientSessionCompletion.create({
            data: {
                patientId,
                sessionId,
                notes,
            },
        });
        await this.checkWeekCompletion(patientId, session.weekId);
        return { message: 'Sessão marcada como concluída', alreadyCompleted: false };
    }
    async uncompleteSession(patientId, sessionId) {
        const existing = await this.prisma.patientSessionCompletion.findUnique({
            where: {
                patientId_sessionId: {
                    patientId,
                    sessionId,
                },
            },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Sessão não estava marcada como concluída');
        }
        await this.prisma.patientSessionCompletion.delete({
            where: { id: existing.id },
        });
        return { message: 'Conclusão da sessão removida' };
    }
    async getWeekDetails(patientId, weekNumber) {
        const dashboard = await this.getTrainingDashboard(patientId);
        const week = dashboard.weeks.find((w) => w.weekNumber === weekNumber);
        if (!week) {
            throw new common_1.NotFoundException(`Semana ${weekNumber} não encontrada`);
        }
        return week;
    }
    async getProgress(patientId) {
        const dashboard = await this.getTrainingDashboard(patientId);
        return {
            currentWeek: dashboard.currentWeek,
            totalWeeks: dashboard.totalWeeks,
            completedWeeks: dashboard.completedWeeks,
            progressPercent: dashboard.progressPercent,
            daysSinceSurgery: dashboard.daysSinceSurgery,
            weeks: dashboard.weeks.map((w) => ({
                weekNumber: w.weekNumber,
                title: w.title,
                status: w.status,
                sessionProgress: w.sessionProgress,
                completedSessions: w.completedSessions,
                totalSessions: w.totalSessions,
            })),
        };
    }
    async ensurePatientProgress(patientId, protocolId, currentWeekNumber) {
        const protocol = await this.prisma.trainingProtocol.findUnique({
            where: { id: protocolId },
            include: { weeks: { orderBy: { weekNumber: 'asc' } } },
        });
        if (!protocol)
            return;
        for (const week of protocol.weeks) {
            const existing = await this.prisma.patientTrainingProgress.findUnique({
                where: {
                    patientId_weekId: {
                        patientId,
                        weekId: week.id,
                    },
                },
            });
            if (!existing) {
                let status;
                if (week.weekNumber < currentWeekNumber) {
                    status = client_1.TrainingWeekStatus.COMPLETED;
                }
                else if (week.weekNumber === currentWeekNumber) {
                    status = client_1.TrainingWeekStatus.CURRENT;
                }
                else {
                    status = client_1.TrainingWeekStatus.FUTURE;
                }
                await this.prisma.patientTrainingProgress.create({
                    data: {
                        patientId,
                        weekId: week.id,
                        status,
                        startedAt: week.weekNumber <= currentWeekNumber ? new Date() : null,
                    },
                });
            }
        }
    }
    async checkWeekCompletion(patientId, weekId) {
        const week = await this.prisma.trainingWeek.findUnique({
            where: { id: weekId },
            include: { sessions: true },
        });
        if (!week)
            return;
        const completedSessions = await this.prisma.patientSessionCompletion.count({
            where: {
                patientId,
                sessionId: { in: week.sessions.map((s) => s.id) },
            },
        });
        if (completedSessions >= week.sessions.length) {
            await this.prisma.patientTrainingProgress.updateMany({
                where: { patientId, weekId },
                data: {
                    status: client_1.TrainingWeekStatus.COMPLETED,
                    completedAt: new Date(),
                },
            });
        }
    }
};
exports.TrainingService = TrainingService;
exports.TrainingService = TrainingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrainingService);
//# sourceMappingURL=training.service.js.map