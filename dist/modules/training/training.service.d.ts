import { PrismaService } from '../../prisma/prisma.service';
export declare class TrainingService {
    private prisma;
    constructor(prisma: PrismaService);
    getTrainingDashboard(patientId: string): Promise<{
        protocol: {
            id: string;
            name: string;
            totalWeeks: number;
        };
        daysSinceSurgery: number;
        currentWeek: number;
        basalHeartRate: number;
        progressPercent: number;
        completedWeeks: number;
        totalWeeks: number;
        weeks: {
            id: string;
            weekNumber: number;
            title: string;
            dayRange: string;
            objective: string;
            maxHeartRate: number | null;
            heartRateLabel: string | null;
            canDo: string[];
            avoid: string[];
            status: string;
            sessions: {
                id: string;
                sessionNumber: number;
                name: string;
                description: string | null;
                duration: number | null;
                intensity: string | null;
                completed: boolean;
            }[];
            totalSessions: number;
            completedSessions: number;
            sessionProgress: number;
        }[];
        currentWeekDetails: {
            id: string;
            weekNumber: number;
            title: string;
            dayRange: string;
            objective: string;
            maxHeartRate: number | null;
            heartRateLabel: string | null;
            canDo: string[];
            avoid: string[];
            status: string;
            sessions: {
                id: string;
                sessionNumber: number;
                name: string;
                description: string | null;
                duration: number | null;
                intensity: string | null;
                completed: boolean;
            }[];
            totalSessions: number;
            completedSessions: number;
            sessionProgress: number;
        } | null;
    }>;
    getTrainingProtocol(patientId: string): Promise<{
        currentWeek: number;
        daysSinceSurgery: number;
        basalHeartRate: number;
        weeks: {
            weekNumber: number;
            title: string;
            dayRange: string;
            status: string;
            objective: string;
            maxHeartRate: number | null;
            heartRateLabel: string | null;
            canDo: string[];
            avoid: string[];
        }[];
    }>;
    completeSession(patientId: string, sessionId: string, notes?: string): Promise<{
        message: string;
        alreadyCompleted: boolean;
    }>;
    uncompleteSession(patientId: string, sessionId: string): Promise<{
        message: string;
    }>;
    getWeekDetails(patientId: string, weekNumber: number): Promise<{
        id: string;
        weekNumber: number;
        title: string;
        dayRange: string;
        objective: string;
        maxHeartRate: number | null;
        heartRateLabel: string | null;
        canDo: string[];
        avoid: string[];
        status: string;
        sessions: {
            id: string;
            sessionNumber: number;
            name: string;
            description: string | null;
            duration: number | null;
            intensity: string | null;
            completed: boolean;
        }[];
        totalSessions: number;
        completedSessions: number;
        sessionProgress: number;
    }>;
    getProgress(patientId: string): Promise<{
        currentWeek: number;
        totalWeeks: number;
        completedWeeks: number;
        progressPercent: number;
        daysSinceSurgery: number;
        weeks: {
            weekNumber: number;
            title: string;
            status: string;
            sessionProgress: number;
            completedSessions: number;
            totalSessions: number;
        }[];
    }>;
    private ensurePatientProgress;
    private checkWeekCompletion;
}
