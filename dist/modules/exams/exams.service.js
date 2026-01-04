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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ExamsService = class ExamsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatientExams(patientId, status) {
        return this.prisma.exam.findMany({
            where: {
                patientId,
                ...(status && { status }),
            },
            orderBy: { date: 'desc' },
        });
    }
    async getExamById(patientId, examId) {
        const exam = await this.prisma.exam.findUnique({
            where: { id: examId },
        });
        if (!exam) {
            throw new common_1.NotFoundException('Exame não encontrado');
        }
        if (exam.patientId !== patientId) {
            throw new common_1.ForbiddenException('Acesso negado');
        }
        return exam;
    }
    async markAsViewed(patientId, examId) {
        const exam = await this.getExamById(patientId, examId);
        if (exam.status === client_1.ExamStatus.AVAILABLE) {
            return this.prisma.exam.update({
                where: { id: examId },
                data: { status: client_1.ExamStatus.VIEWED },
            });
        }
        return exam;
    }
    async createExam(data) {
        return this.prisma.exam.create({
            data: {
                patientId: data.patientId,
                title: data.title,
                type: data.type,
                date: data.date,
                notes: data.notes,
                result: data.result,
                fileUrl: data.fileUrl,
                fileName: data.fileName,
                fileSize: data.fileSize,
                mimeType: data.mimeType,
                status: data.status || client_1.ExamStatus.PENDING,
            },
        });
    }
    async updateExam(examId, data) {
        return this.prisma.exam.update({
            where: { id: examId },
            data,
        });
    }
    async deleteExam(examId) {
        return this.prisma.exam.delete({
            where: { id: examId },
        });
    }
    async attachFile(examId, fileData) {
        return this.prisma.exam.update({
            where: { id: examId },
            data: {
                ...fileData,
                status: client_1.ExamStatus.AVAILABLE,
            },
        });
    }
    async getExamStats(patientId) {
        const [total, pending, available, viewed] = await Promise.all([
            this.prisma.exam.count({ where: { patientId } }),
            this.prisma.exam.count({ where: { patientId, status: client_1.ExamStatus.PENDING } }),
            this.prisma.exam.count({ where: { patientId, status: client_1.ExamStatus.AVAILABLE } }),
            this.prisma.exam.count({ where: { patientId, status: client_1.ExamStatus.VIEWED } }),
        ]);
        return { total, pending, available, viewed };
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map