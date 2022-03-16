import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ProductServiceClient, PRODUCT_SERVICE_NAME, FindOneResponse, DecreaseStockResponse } from '../proto/product.pb';

export class ProductService implements OnModuleInit {
  private service: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  public findOne(id: number): Promise<FindOneResponse> {
    return firstValueFrom(this.service.findOne({ id }));
  }

  public decreaseStock(id: number): Promise<DecreaseStockResponse> {
    return firstValueFrom(this.service.decreaseStock({ id }));
  }
}
