import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Payment } from '../../payment/entities/payment.entity';
import { Budget } from '../../budget/entities';

@Entity({ name: 'budget_expense' })
export class Expense extends BaseEntity {
  @Exclude()
  @ManyToOne(() => Budget, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budget_id' })
  budget!: Budget;

  @Column()
  description!: string;

  @Column()
  provider!: string;

  @Column({ type: 'float' })
  price!: number;

  @Column({ name: 'is_paid', default: false })
  isPaid!: boolean;

  @ManyToMany(() => Payment, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({
    name: 'budget_expense_payments',
    joinColumn: {
      name: 'expense_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'payment_id',
      referencedColumnName: 'id',
    },
  })
  payments?: Payment[];
}
