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
exports.PatientsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const patients_service_1 = require("./patients.service");
const dto_1 = require("./dto");
let PatientsController = class PatientsController {
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    async findAll(clinicId, search, surgeryType) {
        return this.patientsService.findAllByClinic(clinicId, { search, surgeryType });
    }
    async getSurgeryTypes(clinicId) {
        return this.patientsService.getSurgeryTypes(clinicId);
    }
    async findOne(id, clinicId) {
        const patient = await this.patientsService.findOne(id);
        if (patient.clinicId !== clinicId) {
            throw new common_1.ForbiddenException('Paciente não pertence à sua clínica');
        }
        return patient;
    }
    async create(dto, clinicId) {
        return this.patientsService.create(clinicId, dto);
    }
    async update(id, dto, clinicId) {
        const patient = await this.patientsService.findOne(id);
        if (patient.clinicId !== clinicId) {
            throw new common_1.ForbiddenException('Paciente não pertence à sua clínica');
        }
        return this.patientsService.update(id, dto);
    }
    async getStats(id, clinicId) {
        const patient = await this.patientsService.findOne(id);
        if (patient.clinicId !== clinicId) {
            throw new common_1.ForbiddenException('Paciente não pertence à sua clínica');
        }
        return this.patientsService.getPatientStats(id);
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('surgeryType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('surgery-types'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "getSurgeryTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePatientDto, String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePatientDto, String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    (0, roles_decorator_1.Roles)('CLINIC_ADMIN', 'CLINIC_STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('clinicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "getStats", null);
exports.PatientsController = PatientsController = __decorate([
    (0, common_1.Controller)('patients'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map