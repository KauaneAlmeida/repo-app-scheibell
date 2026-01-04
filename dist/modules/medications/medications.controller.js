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
exports.MedicationsController = void 0;
const common_1 = require("@nestjs/common");
const medications_service_1 = require("./medications.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let MedicationsController = class MedicationsController {
    constructor(medicationsService) {
        this.medicationsService = medicationsService;
    }
    getPatientId(req) {
        const patientId = req.user.patientId;
        if (!patientId) {
            throw new common_1.BadRequestException('Patient ID not found');
        }
        return patientId;
    }
    async logMedication(req, dto) {
        const patientId = this.getPatientId(req);
        return this.medicationsService.logMedication(patientId, dto);
    }
    async getMedicationLogs(req, startDate, endDate, contentId, limit) {
        const patientId = this.getPatientId(req);
        return this.medicationsService.getMedicationLogs(patientId, {
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            contentId,
            limit: limit ? parseInt(limit, 10) : undefined,
        });
    }
    async getTodayLogs(req) {
        const patientId = this.getPatientId(req);
        return this.medicationsService.getTodayLogs(patientId);
    }
    async getAdherence(req, days) {
        const patientId = this.getPatientId(req);
        return this.medicationsService.getAdherence(patientId, {
            days: days ? parseInt(days, 10) : undefined,
        });
    }
    async checkIfTakenToday(req, contentId, scheduledTime) {
        const patientId = this.getPatientId(req);
        const taken = await this.medicationsService.wasTakenToday(patientId, contentId, scheduledTime);
        return { taken };
    }
    async undoLog(req, logId) {
        const patientId = this.getPatientId(req);
        const result = await this.medicationsService.undoLog(patientId, logId);
        if (!result) {
            return { success: false, message: 'Log não encontrado' };
        }
        return { success: true, deleted: result };
    }
};
exports.MedicationsController = MedicationsController;
__decorate([
    (0, common_1.Post)('log'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.LogMedicationDto]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "logMedication", null);
__decorate([
    (0, common_1.Get)('logs'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('contentId')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "getMedicationLogs", null);
__decorate([
    (0, common_1.Get)('today'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "getTodayLogs", null);
__decorate([
    (0, common_1.Get)('adherence'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "getAdherence", null);
__decorate([
    (0, common_1.Get)('check/:contentId/:scheduledTime'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('contentId')),
    __param(2, (0, common_1.Param)('scheduledTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "checkIfTakenToday", null);
__decorate([
    (0, common_1.Delete)('log/:id'),
    (0, roles_decorator_1.Roles)('PATIENT'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "undoLog", null);
exports.MedicationsController = MedicationsController = __decorate([
    (0, common_1.Controller)('medications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [medications_service_1.MedicationsService])
], MedicationsController);
//# sourceMappingURL=medications.controller.js.map