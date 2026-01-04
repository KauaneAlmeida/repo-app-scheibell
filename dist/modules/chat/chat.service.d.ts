import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { SendMessageDto } from './dto';
export declare class ChatService {
    private readonly configService;
    private readonly prisma;
    private readonly openaiApiKey;
    private readonly systemPrompt;
    constructor(configService: ConfigService, prisma: PrismaService);
    sendMessage(patientId: string, dto: SendMessageDto): Promise<{
        response: string;
        conversationId: string;
    }>;
    private callOpenAI;
    private getLocalResponse;
    getConversationHistory(patientId: string, conversationId?: string): Promise<{
        id: string;
        messages: any[];
    } | null>;
    getConversations(patientId: string): Promise<any[]>;
}
