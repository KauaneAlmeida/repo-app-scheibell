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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email já está em uso');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const role = dto.role || client_1.UserRole.PATIENT;
        const defaultClinicId = 'clinic-default-scheibell';
        const clinicId = dto.clinicId || (role === client_1.UserRole.PATIENT ? defaultClinicId : null);
        const result = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    passwordHash: hashedPassword,
                    role: role,
                    clinicId: clinicId,
                },
            });
            if (role === client_1.UserRole.PATIENT && clinicId) {
                await tx.patient.create({
                    data: {
                        userId: user.id,
                        clinicId: clinicId,
                        surgeryDate: new Date(),
                    },
                });
            }
            return user;
        });
        return this.generateAuthResponse(result);
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        return this.generateAuthResponse(user);
    }
    async validateUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                clinicId: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return user;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                clinicId: true,
                createdAt: true,
                updatedAt: true,
                patient: {
                    select: {
                        id: true,
                        cpf: true,
                        phone: true,
                        birthDate: true,
                        surgeryDate: true,
                        surgeryType: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return user;
    }
    async updateProfile(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { patient: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            if (dto.name) {
                await tx.user.update({
                    where: { id: userId },
                    data: { name: dto.name },
                });
            }
            if (user.patient) {
                const patientData = {};
                if (dto.phone !== undefined)
                    patientData.phone = dto.phone;
                if (dto.cpf !== undefined)
                    patientData.cpf = dto.cpf;
                if (dto.birthDate !== undefined)
                    patientData.birthDate = new Date(dto.birthDate);
                if (dto.surgeryDate !== undefined)
                    patientData.surgeryDate = new Date(dto.surgeryDate);
                if (dto.surgeryType !== undefined)
                    patientData.surgeryType = dto.surgeryType;
                if (Object.keys(patientData).length > 0) {
                    await tx.patient.update({
                        where: { id: user.patient.id },
                        data: patientData,
                    });
                }
            }
            return tx.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    clinicId: true,
                    patient: {
                        select: {
                            id: true,
                            cpf: true,
                            phone: true,
                            birthDate: true,
                            surgeryDate: true,
                            surgeryType: true,
                        },
                    },
                },
            });
        });
        return result;
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Senha atual incorreta');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash: hashedPassword },
        });
        return { message: 'Senha alterada com sucesso' };
    }
    async forgotPassword(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            return {
                message: 'Se o email existir, um código de recuperação será enviado',
                success: true,
            };
        }
        await this.prisma.passwordReset.updateMany({
            where: {
                userId: user.id,
                used: false,
                expiresAt: { gt: new Date() },
            },
            data: { used: true },
        });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);
        await this.prisma.passwordReset.create({
            data: {
                userId: user.id,
                code,
                expiresAt,
            },
        });
        const isDev = this.configService.get('NODE_ENV') === 'development';
        return {
            message: 'Se o email existir, um código de recuperação será enviado',
            success: true,
            ...(isDev && { code }),
        };
    }
    async verifyCode(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        const passwordReset = await this.prisma.passwordReset.findFirst({
            where: {
                userId: user.id,
                code: dto.code,
                used: false,
                expiresAt: { gt: new Date() },
            },
        });
        if (!passwordReset) {
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        return {
            valid: true,
            message: 'Código válido',
        };
    }
    async resetPassword(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        const passwordReset = await this.prisma.passwordReset.findFirst({
            where: {
                userId: user.id,
                code: dto.code,
                used: false,
                expiresAt: { gt: new Date() },
            },
        });
        if (!passwordReset) {
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: user.id },
                data: { passwordHash: hashedPassword },
            }),
            this.prisma.passwordReset.update({
                where: { id: passwordReset.id },
                data: { used: true },
            }),
        ]);
        return {
            success: true,
            message: 'Senha alterada com sucesso',
        };
    }
    generateAuthResponse(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            clinicId: user.clinicId,
        };
        const expiresIn = this.configService.get('JWT_EXPIRATION') || '24h';
        const expiresInSeconds = this.parseExpirationToSeconds(expiresIn);
        const accessToken = this.jwtService.sign(payload);
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                clinicId: user.clinicId || undefined,
            },
            accessToken,
            expiresIn: expiresInSeconds,
        };
    }
    parseExpirationToSeconds(expiration) {
        const match = expiration.match(/^(\d+)([smhd])$/);
        if (!match) {
            return 86400;
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 3600;
            case 'd':
                return value * 86400;
            default:
                return 86400;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map