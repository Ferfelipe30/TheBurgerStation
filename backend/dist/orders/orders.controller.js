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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const orders_service_1 = require("./orders.service");
let OrdersController = class OrdersController {
    orderService;
    emailService;
    constructor(orderService, emailService) {
        this.orderService = orderService;
        this.emailService = emailService;
    }
    async createOrder(orderDto) {
        if (!orderDto.email) {
            throw new common_1.BadGatewayException('El email del cliente es requerido para enviar la confirmacion.');
        }
        const order = await this.orderService.create(orderDto);
        await this.emailService.sendOrderConfirmation(orderDto.email, orderDto);
        return { message: 'Orden creada y correo enviado con éxito' };
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        email_service_1.EmailService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map