import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from './account.entity';

export type MethodType = 'efectivo' | 'transferencia' | 'otro';

@Entity({ name: 'payment' })
export class Payment extends BaseEntity {
  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'float', default: 1, name: 'currency_rate' })
  currencyRate!: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'acount_id' })
  account: Account;
}
