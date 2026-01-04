"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const content_module_1 = require("./modules/content/content.module");
const health_module_1 = require("./modules/health/health.module");
const appointments_module_1 = require("./modules/appointments/appointments.module");
const medications_module_1 = require("./modules/medications/medications.module");
const chat_module_1 = require("./modules/chat/chat.module");
const exams_module_1 = require("./modules/exams/exams.module");
const training_module_1 = require("./modules/training/training.module");
const patients_module_1 = require("./modules/patients/patients.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            content_module_1.ContentModule,
            health_module_1.HealthModule,
            appointments_module_1.AppointmentsModule,
            medications_module_1.MedicationsModule,
            chat_module_1.ChatModule,
            exams_module_1.ExamsModule,
            training_module_1.TrainingModule,
            patients_module_1.PatientsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map