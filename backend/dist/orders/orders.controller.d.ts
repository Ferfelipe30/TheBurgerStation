import { EmailService } from "../email/email.service";
import { OrdersService } from "./orders.service";
export declare class OrdersController {
    private readonly orderService;
    private readonly emailService;
    constructor(orderService: OrdersService, emailService: EmailService);
    createOrder(orderDto: any): Promise<{
        message: string;
    }>;
}
