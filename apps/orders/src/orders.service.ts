import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateOrderRequest } from "../dto/create-order.request";
import { BILLING_SERVICE } from "./constants/services";
import { OrdersRespository } from "./orders.repository";

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRespository: OrdersRespository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    const session = await this.orderRespository.startTransaction()
    try {
      const order = await this.orderRespository.create(request, {session})
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        })
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction()
      throw err
    }
  }

  async getOrders() {
    return this.orderRespository.find({});
  }
}
