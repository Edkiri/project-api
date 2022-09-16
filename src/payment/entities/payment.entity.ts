import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { Currency } from './currency.entity';

@Entity({ name: 'payment' })
export class Payment extends BaseEntity {
  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'float', default: 1, name: 'currency_rate' })
  currencyRate!: number;

  @ManyToOne(() => Currency, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'currency_id' })
  currency!: Currency;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'acount_id' })
  account!: Account;
}
