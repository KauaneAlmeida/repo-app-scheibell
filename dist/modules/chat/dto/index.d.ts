export declare class SendMessageDto {
    message: string;
    conversationId?: string;
}
export declare class ChatMessageDto {
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt?: Date;
}
export declare class ConversationDto {
    id: string;
    messages: ChatMessageDto[];
    createdAt: Date;
    updatedAt: Date;
}
