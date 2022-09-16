import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Currency } from './currency.entity';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @Column()
  owner!: string;

  @Column()
  platform!: string;

  @Column({ type: 'float' })
  balance!: number;

  @ManyToOne(() => Currency, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'currency_id' })
  currency!: Currency;
}
