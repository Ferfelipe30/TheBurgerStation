import { BadGatewayException, Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService,
        private readonly emailService: EmailService
    ) {}

    @Post()
    async createOrder(@Body() orderDto: any) {
        if (!orderDto.email) {
            throw new BadGatewayException('El email del cliente es requerido para enviar la confirmacion.');
        }
        // Guarda la orden en la base de datos
        const order = await this.orderService.create(orderDto);

        // Envía el correo de confirmación
        await this.emailService.sendOrderConfirmation(orderDto.email, orderDto);
        return { message: 'Orden creada y correo enviado con éxito' };
    }
}