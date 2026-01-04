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
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const content_service_1 = require("./content.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    async getClinicContents(clinicId, type, category) {
        return this.contentService.getClinicContents(clinicId, type, category);
    }
    async getClinicContentsByType(clinicId, type) {
        return this.contentService.getClinicContentsByType(clinicId, type);
    }
    async getContentStats(clinicId) {
        return this.contentService.getContentStats(clinicId);
    }
    async createClinicContent(clinicId, data) {
        return this.contentService.createClinicContent(clinicId, data);
    }
    async updateClinicContent(id, clinicId, data) {
        return this.contentService.updateClinicContent(id, clinicId, data);
    }
    async toggleClinicContent(id, clinicId) {
        return this.contentService.toggleClinicContent(id, clinicId);
    }
    async deleteClinicContent(id, clinicId) {
        return this.contentService.deleteClinicContent(id, clinicId);
    }
    async reorderContents(clinicId, contentIds) {
        return this.contentService.reorderClinicContents(clinicId, contentIds);
    }
    async syncTemplates(clinicId) {
        return this.contentService.syncTemplatesForClinic(clinicId);
    }
    async getMyContent(patientId, type, day) {
        return this.contentService.getPatientContent(patientId, type, day ? parseInt(day) : undefined);
    }
    async getPatientClinicContent(patientId, type, category) {
        return this.contentService.getPatientClinicContent(patientId, type, category);
    }
    async getPatientAllClinicContentByType(patientId, type) {
        return this.contentService.getPatientAllClinicContentByType(patientId, type);
    }
    async addPatientMedication(patientId, data) {
        return this.contentService.addPatientMedication(patientId, data);
    }
    async getTrainingProtocol(patientId) {
        return this.contentService.getPatientTrainingProtocol(patientId);
    }
    async getPatientAdjustments(patientId) {
        return this.contentService.getPatientAdjustments(patientId);
    }
    async addPatientContent(patientId, userId, data) {
        return this.contentService.addPatientContent(patientId, data, userId);
    }
    async disableForPatient(patientId, userId, data) {
        return this.contentService.disableContentForPatient(patientId, data.baseContentId, data.reason, userId);
    }
    async modifyForPatient(patientId, userId, data) {
        return this.contentService.modifyContentForPatient(patientId, data.baseContentId, data, userId);
    }
    async removeAdjustment(adjustmentId) {
        return this.contentService.removePatientAdjustment(adjustmentId);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Get)('clinic'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getClinicContents", null);
__decorate([
    (0, common_1.Get)('clinic/all'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getClinicContentsByType", null);
__decorate([
    (0, common_1.Get)('clinic/stats'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContentStats", null);
__decorate([
    (0, common_1.Post)('clinic'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createClinicContent", null);
__decorate([
    (0, common_1.Put)('clinic/:id'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateClinicContent", null);
__decorate([
    (0, common_1.Patch)('clinic/:id/toggle'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "toggleClinicContent", null);
__decorate([
    (0, common_1.Delete)('clinic/:id'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteClinicContent", null);
__decorate([
    (0, common_1.Post)('clinic/reorder'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __param(1, (0, common_1.Body)('contentIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "reorderContents", null);
__decorate([
    (0, common_1.Post)('clinic/sync'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "syncTemplates", null);
__decorate([
    (0, common_1.Get)('patient/me'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getMyContent", null);
__decorate([
    (0, common_1.Get)('patient/clinic'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getPatientClinicContent", null);
__decorate([
    (0, common_1.Get)('patient/clinic/all'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getPatientAllClinicContentByType", null);
__decorate([
    (0, common_1.Post)('patient/medication'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "addPatientMedication", null);
__decorate([
    (0, common_1.Get)('patient/training-protocol'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getTrainingProtocol", null);
__decorate([
    (0, common_1.Get)('patients/:patientId/adjustments'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getPatientAdjustments", null);
__decorate([
    (0, common_1.Post)('patients/:patientId/adjustments/add'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "addPatientContent", null);
__decorate([
    (0, common_1.Post)('patients/:patientId/adjustments/disable'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "disableForPatient", null);
__decorate([
    (0, common_1.Post)('patients/:patientId/adjustments/modify'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "modifyForPatient", null);
__decorate([
    (0, common_1.Delete)('patients/:patientId/adjustments/:adjustmentId'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('adjustmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "removeAdjustment", null);
exports.ContentController = ContentController = __decorate([
    (0, common_1.Controller)('content'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content.controller.js.map