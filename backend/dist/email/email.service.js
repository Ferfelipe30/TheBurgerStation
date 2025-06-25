"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const sgMail = require("@sendgrid/mail");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    configService;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('SENDGRID_API_KEY');
        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY is not defined in environment variables');
        }
        sgMail.setApiKey(apiKey);
    }
    async sendOrderConfirmation(to, order) {
        const from = this.configService.get('SENDGRID_FROM_EMAIL');
        if (!from) {
            throw new Error('SENDGRID_FROM_EMAIL is not defined in environment variables');
        }
        const itemsList = order.items.map((item) => `<li>${item.quantity} x ${item.name} - $${item.unitPrice * item.quantity}</li>`).join('');
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map