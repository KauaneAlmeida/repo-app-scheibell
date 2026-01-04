import { TrainingService } from './training.service';
import { CompleteSessionDto } from './dto/complete-session.dto';
export declare class TrainingController {
    private trainingService;
    constructor(trainingService: TrainingService);
    getDashboard(patientId: string): Promise<{
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
    getProtocol(patientId: string): Promise<{
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
    getWeekDetails(patientId: string, weekNumber: string): Promise<{
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
    completeSession(patientId: string, sessionId: string, dto: CompleteSessionDto): Promise<{
        message: string;
        alreadyCompleted: boolean;
    }>;
    uncompleteSession(patientId: string, sessionId: string): Promise<{
        message: string;
    }>;
}
