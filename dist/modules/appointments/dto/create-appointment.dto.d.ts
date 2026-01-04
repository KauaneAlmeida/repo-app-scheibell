import { AppointmentType } from '@prisma/client';
export declare class CreateAppointmentDto {
    title: string;
    description?: string;
    date: string;
    time: string;
    type: AppointmentType;
    location?: string;
    notes?: string;
}
