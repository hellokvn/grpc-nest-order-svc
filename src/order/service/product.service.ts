import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ProductServiceClient, PRODUCT_SERVICE_NAME, FindOneResponse, DecreaseStockResponse } from '../proto/product.pb';

export class ProductService implements OnModuleInit {
  private svc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  public findOne(id: number): Promise<FindOneResponse> {
    return firstValueFrom(this.svc.findOne({ id }));
  }

  public decreaseStock(id: number): Promise<DecreaseStockResponse> {
    return firstValueFrom(this.svc.decreaseStock({ id }));
  }
}
