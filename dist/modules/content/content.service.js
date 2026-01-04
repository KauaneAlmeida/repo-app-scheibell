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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const training_service_1 = require("../training/training.service");
let ContentService = class ContentService {
    constructor(prisma, trainingService) {
        this.prisma = prisma;
        this.trainingService = trainingService;
    }
    async getClinicContents(clinicId, type, category) {
        const where = { clinicId, type, isActive: true };
        if (category)
            where.category = category;
        return this.prisma.clinicContent.findMany({
            where,
            orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
        });
    }
    async getClinicContentsByType(clinicId, type) {
        return this.prisma.clinicContent.findMany({
            where: { clinicId, type },
            orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
        });
    }
    async getPatientClinicContent(patientId, type, category) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            select: { clinicId: true },
        });
        if (!patient)
            throw new common_1.NotFoundException('Paciente não encontrado');
        const where = { clinicId: patient.clinicId, type, isActive: true };
        if (category)
            where.category = category;
        return this.prisma.clinicContent.findMany({
            where,
            orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
        });
    }
    async getPatientAllClinicContentByType(patientId, type) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            select: { clinicId: true },
        });
        if (!patient)
            throw new common_1.NotFoundException('Paciente não encontrado');
        return this.prisma.clinicContent.findMany({
            where: { clinicId: patient.clinicId, type },
            orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
        });
    }
    async createClinicContent(clinicId, data) {
        const maxOrder = await this.prisma.clinicContent.aggregate({
            where: { clinicId, type: data.type },
            _max: { sortOrder: true },
        });
        return this.prisma.clinicContent.create({
            data: {
                clinicId,
                ...data,
                sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
                isCustom: true,
            },
        });
    }
    async updateClinicContent(id, clinicId, data) {
        const content = await this.prisma.clinicContent.findFirst({
            where: { id, clinicId },
        });
        if (!content)
            throw new common_1.NotFoundException('Conteúdo não encontrado');
        return this.prisma.clinicContent.update({
            where: { id },
            data,
        });
    }
    async toggleClinicContent(id, clinicId) {
        const content = await this.prisma.clinicContent.findFirst({
            where: { id, clinicId },
        });
        if (!content)
            throw new common_1.NotFoundException('Conteúdo não encontrado');
        return this.prisma.clinicContent.update({
            where: { id },
            data: { isActive: !content.isActive },
        });
    }
    async deleteClinicContent(id, clinicId) {
        const content = await this.prisma.clinicContent.findFirst({
            where: { id, clinicId },
        });
        if (!content)
            throw new common_1.NotFoundException('Conteúdo não encontrado');
        return this.prisma.clinicContent.delete({ where: { id } });
    }
    async reorderClinicContents(clinicId, contentIds) {
        const updates = contentIds.map((id, index) => this.prisma.clinicContent.updateMany({
            where: { id, clinicId },
            data: { sortOrder: index },
        }));
        await this.prisma.$transaction(updates);
        return { success: true, reordered: contentIds.length };
    }
    async getPatientAdjustments(patientId) {
        return this.prisma.patientContentAdjustment.findMany({
            where: { patientId, isActive: true },
            include: { baseContent: true },
        });
    }
    async addPatientContent(patientId, data, createdBy) {
        return this.prisma.patientContentAdjustment.create({
            data: {
                patientId,
                adjustmentType: client_1.AdjustmentType.ADD,
                contentType: data.contentType,
                category: data.category,
                title: data.title,
                description: data.description,
                reason: data.reason,
                createdBy,
            },
        });
    }
    async disableContentForPatient(patientId, baseContentId, reason, createdBy) {
        return this.prisma.patientContentAdjustment.create({
            data: {
                patientId,
                baseContentId,
                adjustmentType: client_1.AdjustmentType.DISABLE,
                reason,
                createdBy,
            },
        });
    }
    async modifyContentForPatient(patientId, baseContentId, data, createdBy) {
        return this.prisma.patientContentAdjustment.create({
            data: {
                patientId,
                baseContentId,
                adjustmentType: client_1.AdjustmentType.MODIFY,
                ...data,
                createdBy,
            },
        });
    }
    async removePatientAdjustment(adjustmentId) {
        return this.prisma.patientContentAdjustment.delete({
            where: { id: adjustmentId },
        });
    }
    async addPatientMedication(patientId, data) {
        let fullDescription = '';
        if (data.dosage)
            fullDescription += `Dosagem: ${data.dosage}`;
        if (data.frequency) {
            fullDescription += fullDescription ? ` | Frequência: ${data.frequency}` : `Frequência: ${data.frequency}`;
        }
        if (data.times && data.times.length > 0) {
            fullDescription += fullDescription ? ` | Horários: ${data.times.join(', ')}` : `Horários: ${data.times.join(', ')}`;
        }
        if (data.description) {
            fullDescription += fullDescription ? ` | ${data.description}` : data.description;
        }
        return this.prisma.patientContentAdjustment.create({
            data: {
                patientId,
                adjustmentType: client_1.AdjustmentType.ADD,
                contentType: client_1.ContentType.MEDICATIONS,
                category: client_1.ContentCategory.INFO,
                title: data.title,
                description: fullDescription || data.description,
                reason: 'Medicação adicionada pelo paciente',
                createdBy: patientId,
            },
        });
    }
    async getPatientContent(patientId, type, dayPostOp) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            select: { clinicId: true },
        });
        if (!patient)
            throw new common_1.NotFoundException('Paciente não encontrado');
        const baseContents = await this.prisma.clinicContent.findMany({
            where: { clinicId: patient.clinicId, type, isActive: true },
            orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
        });
        const adjustments = await this.prisma.patientContentAdjustment.findMany({
            where: {
                patientId,
                isActive: true,
                OR: [
                    { contentType: type },
                    { baseContent: { type } },
                ],
            },
        });
        const disabledIds = new Set(adjustments
            .filter((a) => a.adjustmentType === 'DISABLE')
            .map((a) => a.baseContentId));
        const modifications = new Map(adjustments
            .filter((a) => a.adjustmentType === 'MODIFY')
            .map((a) => [a.baseContentId, a]));
        const addedItems = adjustments.filter((a) => a.adjustmentType === 'ADD');
        let finalContent = baseContents
            .filter((item) => !disabledIds.has(item.id))
            .map((item) => {
            const mod = modifications.get(item.id);
            return {
                id: item.id,
                type: item.type,
                category: mod?.category ?? item.category,
                title: mod?.title ?? item.title,
                description: mod?.description ?? item.description,
                validFromDay: item.validFromDay,
                validUntilDay: item.validUntilDay,
                isModified: !!mod,
                isCustom: false,
                customReason: mod?.reason,
            };
        });
        addedItems.forEach((item) => {
            finalContent.push({
                id: item.id,
                type: item.contentType,
                category: item.category,
                title: item.title,
                description: item.description,
                validFromDay: item.validFromDay,
                validUntilDay: item.validUntilDay,
                isModified: false,
                isCustom: true,
                customReason: item.reason,
            });
        });
        if (dayPostOp !== undefined) {
            finalContent = finalContent.filter((item) => {
                const from = item.validFromDay ?? 0;
                const until = item.validUntilDay ?? 999;
                return dayPostOp >= from && dayPostOp <= until;
            });
        }
        const categoryOrder = {
            NORMAL: 0, ALLOWED: 0,
            WARNING: 1, RESTRICTED: 1,
            EMERGENCY: 2, PROHIBITED: 2,
            INFO: 3,
        };
        finalContent.sort((a, b) => (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99));
        return {
            type,
            items: finalContent,
            totalCount: finalContent.length,
        };
    }
    async syncTemplatesForClinic(clinicId) {
        const existingTemplateIds = await this.prisma.clinicContent.findMany({
            where: { clinicId, templateId: { not: null } },
            select: { templateId: true },
        });
        const existingIds = new Set(existingTemplateIds.map((c) => c.templateId));
        const newTemplates = await this.prisma.systemContentTemplate.findMany({
            where: {
                isActive: true,
                id: { notIn: Array.from(existingIds) },
            },
        });
        if (newTemplates.length > 0) {
            await this.prisma.clinicContent.createMany({
                data: newTemplates.map((t) => ({
                    clinicId,
                    templateId: t.id,
                    type: t.type,
                    category: t.category,
                    title: t.title,
                    description: t.description,
                    validFromDay: t.validFromDay,
                    validUntilDay: t.validUntilDay,
                    sortOrder: t.sortOrder,
                    isCustom: false,
                })),
            });
        }
        return { synced: newTemplates.length };
    }
    async getPatientTrainingProtocol(patientId) {
        return this.trainingService.getTrainingProtocol(patientId);
    }
    async getContentStats(clinicId) {
        const counts = await this.prisma.clinicContent.groupBy({
            by: ['type'],
            where: { clinicId, isActive: true },
            _count: true,
        });
        const stats = {};
        counts.forEach((c) => {
            stats[c.type] = c._count;
        });
        return stats;
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => training_service_1.TrainingService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        training_service_1.TrainingService])
], ContentService);
//# sourceMappingURL=content.service.js.map