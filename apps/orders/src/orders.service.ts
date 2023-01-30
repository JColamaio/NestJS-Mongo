import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderRequest } from '../dto/create-order.request';
import { BILLING_SERVICE } from './constants/services';
import { OrdersRespository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRespository: OrdersRespository, @Inject(BILLING_SERVICE) private billingClient: ClientProxy) {}

  async createOrder(request: CreateOrderRequest) {
    return this.orderRespository.create(request)
  }

  async getOrders() {
    return this.orderRespository.find({})
  }
}
