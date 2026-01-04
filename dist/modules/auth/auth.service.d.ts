import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, RegisterDto, UpdateProfileDto, ChangePasswordDto, ForgotPasswordDto, VerifyCodeDto, ResetPasswordDto } from './dto';
import { UserRole } from '@prisma/client';
export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        clinicId?: string;
    };
    accessToken: string;
    expiresIn: number;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    validateUser(userId: string): Promise<{
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        clinicId: string | null;
        id: string;
    }>;
    getProfile(userId: string): Promise<{
        patient: {
            phone: string | null;
            cpf: string | null;
            birthDate: Date | null;
            surgeryDate: Date | null;
            surgeryType: string | null;
            id: string;
        } | null;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        clinicId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        patient: {
            phone: string | null;
            cpf: string | null;
            birthDate: Date | null;
            surgeryDate: Date | null;
            surgeryType: string | null;
            id: string;
        } | null;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        clinicId: string | null;
        id: string;
    } | null>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        code?: string | undefined;
        message: string;
        success: boolean;
    }>;
    verifyCode(dto: VerifyCodeDto): Promise<{
        valid: boolean;
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    private generateAuthResponse;
    private parseExpirationToSeconds;
}
