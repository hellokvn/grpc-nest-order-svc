import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './service/order.service';
import { ORDER_SERVICE_NAME, CreateOrderResponse } from './proto/order.pb';
import { CreateOrderRequestDto } from './order.dto';

@Controller('order')
export class OrderController {
  @Inject(OrderService)
  private readonly service: OrderService;

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  private async createOrder(data: CreateOrderRequestDto): Promise<CreateOrderResponse> {
    return this.service.createOrder(data);
  }
}
