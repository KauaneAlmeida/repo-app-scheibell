import { PrismaService } from '../../prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        timestamp: string;
        services: {
            database: string;
        };
    }>;
    liveness(): {
        status: string;
    };
    readiness(): Promise<{
        status: string;
        database: string;
    } | {
        status: string;
        database?: undefined;
    }>;
    private checkDatabase;
}
