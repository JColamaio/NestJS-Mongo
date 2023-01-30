import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from '../dto/create-order.request';
import { OrdersRespository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRespository: OrdersRespository) {}

  async createOrder(request: CreateOrderRequest) {
    return this.orderRespository.create(request)
  }
}
