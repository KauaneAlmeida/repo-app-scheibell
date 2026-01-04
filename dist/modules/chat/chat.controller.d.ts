import { ChatService } from './chat.service';
import { SendMessageDto } from './dto';
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
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    private getPatientId;
    sendMessage(req: AuthenticatedRequest, dto: SendMessageDto): Promise<{
        response: string;
        conversationId: string;
    }>;
    getHistory(req: AuthenticatedRequest, conversationId?: string): Promise<{
        id: string;
        messages: any[];
    } | null>;
    getConversations(req: AuthenticatedRequest): Promise<any[]>;
}
export {};
