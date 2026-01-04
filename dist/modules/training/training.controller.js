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
exports.TrainingController = void 0;
const common_1 = require("@nestjs/common");
const training_service_1 = require("./training.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const complete_session_dto_1 = require("./dto/complete-session.dto");
let TrainingController = class TrainingController {
    constructor(trainingService) {
        this.trainingService = trainingService;
    }
    async getDashboard(patientId) {
        return this.trainingService.getTrainingDashboard(patientId);
    }
    async getProtocol(patientId) {
        return this.trainingService.getTrainingProtocol(patientId);
    }
    async getProgress(patientId) {
        return this.trainingService.getProgress(patientId);
    }
    async getWeekDetails(patientId, weekNumber) {
        return this.trainingService.getWeekDetails(patientId, parseInt(weekNumber));
    }
    async completeSession(patientId, sessionId, dto) {
        return this.trainingService.completeSession(patientId, sessionId, dto.notes);
    }
    async uncompleteSession(patientId, sessionId) {
        return this.trainingService.uncompleteSession(patientId, sessionId);
    }
};
exports.TrainingController = TrainingController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('protocol'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getProtocol", null);
__decorate([
    (0, common_1.Get)('progress'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getProgress", null);
__decorate([
    (0, common_1.Get)('weeks/:weekNumber'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __param(1, (0, common_1.Param)('weekNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getWeekDetails", null);
__decorate([
    (0, common_1.Post)('sessions/:sessionId/complete'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __param(1, (0, common_1.Param)('sessionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, complete_session_dto_1.CompleteSessionDto]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "completeSession", null);
__decorate([
    (0, common_1.Delete)('sessions/:sessionId/complete'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)('patientId')),
    __param(1, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "uncompleteSession", null);
exports.TrainingController = TrainingController = __decorate([
    (0, common_1.Controller)('training'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [training_service_1.TrainingService])
], TrainingController);
//# sourceMappingURL=training.controller.js.map