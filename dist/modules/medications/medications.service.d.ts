import { PrismaService } from '../../prisma/prisma.service';
import { LogMedicationDto } from './dto';
export declare class MedicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    logMedication(patientId: string, dto: LogMedicationDto): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        contentId: string;
        scheduledTime: string;
        takenAt: Date;
    }>;
    getMedicationLogs(patientId: string, options?: {
        startDate?: Date;
        endDate?: Date;
        contentId?: string;
        limit?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        contentId: string;
        scheduledTime: string;
        takenAt: Date;
    }[]>;
    getTodayLogs(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        contentId: string;
        scheduledTime: string;
        takenAt: Date;
    }[]>;
    getAdherence(patientId: string, options?: {
        days?: number;
    }): Promise<{
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
    wasTakenToday(patientId: string, contentId: string, scheduledTime: string): Promise<boolean>;
    undoLog(patientId: string, logId: string): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        contentId: string;
        scheduledTime: string;
        takenAt: Date;
    } | null>;
}
