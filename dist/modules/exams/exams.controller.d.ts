import { ExamsService } from './exams.service';
import { Request as ExpressRequest } from 'express';
import { ExamStatus } from '@prisma/client';
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        sub: string;
        email: string;
        role: string;
        patientId?: string;
        clinicId?: string;
    };
}
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    private getPatientId;
    getMyExams(req: AuthenticatedRequest, status?: ExamStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        patientId: string;
        title: string;
        status: import(".prisma/client").$Enums.ExamStatus;
        notes: string | null;
        type: string;
        date: Date;
        fileUrl: string | null;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
    }[]>;
    getMyExamStats(req: AuthenticatedRequest): Promise<{
        total: number;
        pending: number;
        available: number;
        viewed: number;
    }>;
    getExamDetails(req: AuthenticatedRequest, examId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        patientId: string;
        title: string;
        status: import(".prisma/client").$Enums.ExamStatus;
        notes: string | null;
        type: string;
        date: Date;
        fileUrl: string | null;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
    }>;
    markAsViewed(req: AuthenticatedRequest, examId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        patientId: string;
        title: string;
        status: import(".prisma/client").$Enums.ExamStatus;
        notes: string | null;
        type: string;
        date: Date;
        fileUrl: string | null;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
    }>;
    createExam(data: {
        patientId: string;
        title: string;
        type: string;
        date: string;
        notes?: string;
        result?: string;
        status?: ExamStatus;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        patientId: string;
        title: string;
        status: import(".prisma/client").$Enums.ExamStatus;
        notes: string | null;
        type: string;
        date: Date;
        fileUrl: string | null;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
    }>;
    updateExam(examId: string, data: {
        title?: string;
        type?: string;
        date?: string;
        notes?: string;
        result?: string;
        status?: ExamStatus;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        patientId: string;
        title: string;
        status: import(".prisma/client").$Enums.ExamStatus;
        notes: string | null;
        type: string;
        date: Date;
        fileUrl: string | null;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
    }>;
    deleteExam(examId: string): Promise<{
        success: boolean;
    }>;
    attachFile(examId: string, data: {
        fileUrl: string;
        fileName: string;
        fileSize: number;
        mimeType: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        patientId: string;
        title: string;
        status: import(".prisma/client").$Enums.ExamStatus;
        notes: string | null;
        type: string;
        date: Date;
        fileUrl: string | null;
        fileName: string | null;
        fileSize: number | null;
        mimeType: string | null;
    }>;
}
export {};
