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
exports.ExamsController = void 0;
const common_1 = require("@nestjs/common");
const exams_service_1 = require("./exams.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let ExamsController = class ExamsController {
    constructor(examsService) {
        this.examsService = examsService;
    }
    getPatientId(req) {
        const patientId = req.user.patientId;
        if (!patientId) {
            throw new common_1.BadRequestException('Patient ID not found');
        }
        return patientId;
    }
    async getMyExams(req, status) {
        const patientId = this.getPatientId(req);
        return this.examsService.getPatientExams(patientId, status);
    }
    async getMyExamStats(req) {
        const patientId = this.getPatientId(req);
        return this.examsService.getExamStats(patientId);
    }
    async getExamDetails(req, examId) {
        const patientId = this.getPatientId(req);
        return this.examsService.getExamById(patientId, examId);
    }
    async markAsViewed(req, examId) {
        const patientId = this.getPatientId(req);
        return this.examsService.markAsViewed(patientId, examId);
    }
    async createExam(data) {
        return this.examsService.createExam({
            ...data,
            date: new Date(data.date),
        });
    }
    async updateExam(examId, data) {
        return this.examsService.updateExam(examId, {
            ...data,
            date: data.date ? new Date(data.date) : undefined,
        });
    }
    async deleteExam(examId) {
        await this.examsService.deleteExam(examId);
        return { success: true };
    }
    async attachFile(examId, data) {
        return this.examsService.attachFile(examId, data);
    }
};
exports.ExamsController = ExamsController;
__decorate([
    (0, common_1.Get)('patient'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "getMyExams", null);
__decorate([
    (0, common_1.Get)('patient/stats'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "getMyExamStats", null);
__decorate([
    (0, common_1.Get)('patient/:id'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "getExamDetails", null);
__decorate([
    (0, common_1.Patch)('patient/:id/viewed'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "markAsViewed", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "createExam", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "updateExam", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "deleteExam", null);
__decorate([
    (0, common_1.Post)(':id/file'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "attachFile", null);
exports.ExamsController = ExamsController = __decorate([
    (0, common_1.Controller)('exams'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
//# sourceMappingURL=exams.controller.js.map