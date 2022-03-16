import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { FindOneResponse, DecreaseStockResponse } from '../proto/product.pb';
import { CreateOrderRequest, CreateOrderResponse } from '../proto/order.pb';
import { Order } from '../order.entity';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  @Inject(ProductService)
  private readonly productSvc: ProductService;

  public async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    const product: FindOneResponse = await this.productSvc.findOne(data.productId);

    if (product.status >= HttpStatus.NOT_FOUND) {
      return { id: null, error: ['Product not found'], status: product.status };
    } else if (product.data.stock < data.quantity) {
      return { id: null, error: ['Stock too less'], status: HttpStatus.CONFLICT };
    }

    const decreasedStockData: DecreaseStockResponse = await this.productSvc.decreaseStock(data.productId);

    if (decreasedStockData.status === HttpStatus.CONFLICT) {
      return { id: null, error: ['Stock too less'], status: HttpStatus.CONFLICT };
    }

    const order: Order = new Order();

    order.price = product.data.price;
    order.productId = product.data.id;
    order.userId = data.userId;

    await this.repository.save(order);

    return { id: order.id, error: null, status: HttpStatus.OK };
  }
}
