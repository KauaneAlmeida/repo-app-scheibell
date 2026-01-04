import { AuthService, AuthResponse } from './auth.service';
import { LoginDto, RegisterDto, UpdateProfileDto, ChangePasswordDto, ForgotPasswordDto, VerifyCodeDto, ResetPasswordDto } from './dto';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    getProfile(user: JwtPayload): Promise<{
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
    updateProfile(user: JwtPayload, dto: UpdateProfileDto): Promise<{
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
    changePassword(user: JwtPayload, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    validateToken(user: JwtPayload): Promise<{
        valid: boolean;
        user: {
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
            clinicId: string | null;
            id: string;
        };
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
}
