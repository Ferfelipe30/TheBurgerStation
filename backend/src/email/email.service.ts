import { Injectable } from "@nestjs/common";
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY is not defined in environment variables');
        }
        sgMail.setApiKey(apiKey);
    }

   
    async sendOrderConfirmation(to: string, order: any) {
    const from = this.configService.get<string>('SENDGRID_FROM_EMAIL');
    if (!from) {
      throw new Error('SENDGRID_FROM_EMAIL is not defined in environment variables');
    }
    const itemsList = order.items.map(
      (item: any) => `<li>${item.quantity} x ${item.name} - $${item.unitPrice * item.quantity}</li>`
    ).join('');
    const html = `
      <h2>¡Gracias por tu pedido en The Burger Station!</h2>
      <p>Resumen de tu pedido:</p>
      <ul>${itemsList}</ul>
      <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
      <p>Impuestos: $${order.tax.toFixed(2)}</p>
      <p>Envío: $${order.deliveryFee.toFixed(2)}</p>
      <p><b>Total: $${order.total.toFixed(2)}</b></p>
    `;
    await sgMail.send({
      to,
      from,
      subject: 'Confirmación de tu pedido - The Burger Station',
      html,
    });
  }
}