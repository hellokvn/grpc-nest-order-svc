import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public price!: number;

  /*
   * Relation IDs
   */

  @Column({ type: 'integer' })
  public productId!: number;

  @Column({ type: 'integer' })
  public userId!: number;
}
