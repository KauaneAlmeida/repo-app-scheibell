import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(clinicId: string, search?: string, surgeryType?: string): Promise<{
        patients: {
            id: string;
            userId: string;
            name: string;
            email: string;
            phone: string | null;
            cpf: string | null;
            birthDate: Date | null;
            surgeryDate: Date | null;
            surgeryType: string | null;
            daysPostOp: number | null;
            clinicId: string;
            createdAt: Date;
        }[];
        total: number;
    }>;
    getSurgeryTypes(clinicId: string): Promise<(string | null)[]>;
    findOne(id: string, clinicId: string): Promise<{
        name: string;
        email: string;
        daysPostOp: number | null;
        user: {
            email: string;
            name: string;
            id: string;
        };
        clinic: {
            name: string;
            id: string;
        };
        contentAdjustments: ({
            baseContent: {
                clinicId: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                isActive: boolean;
                title: string;
                sortOrder: number;
                templateId: string | null;
                type: import(".prisma/client").$Enums.ContentType;
                category: import(".prisma/client").$Enums.ContentCategory;
                validFromDay: number | null;
                validUntilDay: number | null;
                isCustom: boolean;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            patientId: string;
            description: string | null;
            isActive: boolean;
            title: string | null;
            category: import(".prisma/client").$Enums.ContentCategory | null;
            validFromDay: number | null;
            validUntilDay: number | null;
            baseContentId: string | null;
            adjustmentType: import(".prisma/client").$Enums.AdjustmentType;
            contentType: import(".prisma/client").$Enums.ContentType | null;
            reason: string | null;
            createdBy: string | null;
        })[];
        clinicId: string;
        phone: string | null;
        cpf: string | null;
        birthDate: Date | null;
        surgeryDate: Date | null;
        surgeryType: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    create(dto: CreatePatientDto, clinicId: string): Promise<{
        name: string;
        email: string;
        daysPostOp: number | null;
        user: {
            email: string;
            name: string;
            id: string;
        };
        clinicId: string;
        phone: string | null;
        cpf: string | null;
        birthDate: Date | null;
        surgeryDate: Date | null;
        surgeryType: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, dto: UpdatePatientDto, clinicId: string): Promise<{
        name: string;
        email: string;
        daysPostOp: number | null;
        user: {
            email: string;
            name: string;
            id: string;
        };
        clinicId: string;
        phone: string | null;
        cpf: string | null;
        birthDate: Date | null;
        surgeryDate: Date | null;
        surgeryType: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getStats(id: string, clinicId: string): Promise<{
        daysPostOp: number | null;
        medicationsTakenLast7Days: number;
        completedAppointments: number;
        activeAdjustments: number;
    }>;
}
