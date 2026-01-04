import { MedicationsService } from './medications.service';
import { LogMedicationDto } from './dto';
import { Request as ExpressRequest } from 'express';
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        sub: string;
        email: string;
        role: string;
        patientId?: string;
        clinicId?: string;
    };
}
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    private getPatientId;
    logMedication(req: AuthenticatedRequest, dto: LogMedicationDto): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        contentId: string;
        scheduledTime: string;
        takenAt: Date;
    }>;
    getMedicationLogs(req: AuthenticatedRequest, startDate?: string, endDate?: string, contentId?: string, limit?: string): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        contentId: string;
        scheduledTime: string;
        takenAt: Date;
    }[]>;
    getTodayLogs(req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        contentId: string;
        scheduledTime: string;
        takenAt: Date;
    }[]>;
    getAdherence(req: AuthenticatedRequest, days?: string): Promise<{
        adherence: number;
        taken: number;
        expected: number;
        days?: undefined;
        medicationsCount?: undefined;
    } | {
        adherence: number;
        taken: number;
        expected: number;
        days: number;
        medicationsCount: number;
    }>;
    checkIfTakenToday(req: AuthenticatedRequest, contentId: string, scheduledTime: string): Promise<{
        taken: boolean;
    }>;
    undoLog(req: AuthenticatedRequest, logId: string): Promise<{
        success: boolean;
        message: string;
        deleted?: undefined;
    } | {
        success: boolean;
        deleted: {
            id: string;
            createdAt: Date;
            patientId: string;
            contentId: string;
            scheduledTime: string;
            takenAt: Date;
        };
        message?: undefined;
    }>;
}
export {};
