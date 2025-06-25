import { ConfigService } from "@nestjs/config";
export declare class EmailService {
    private configService;
    constructor(configService: ConfigService);
    sendOrderConfirmation(to: string, order: any): Promise<void>;
}
