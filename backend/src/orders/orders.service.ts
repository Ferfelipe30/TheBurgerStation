import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersService {
  async create(orderData: any) {
    return {
      id: Date.now(),
      ...orderData,
    };
  }
}