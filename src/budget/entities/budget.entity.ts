import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { BudgetUnit } from './budget-unit.entity';
import { Work } from '../../work/entities';
import { Expense } from '../../expense/entities';

@Entity({ name: 'budget' })
export class Budget extends BaseEntity {
  @Column()
  description!: string;

  @Column({ type: 'float' })
  quantity!: number;

  @Column({ name: 'unit_price', type: 'float' })
  unitPrice!: number;

  @ManyToOne(() => BudgetUnit, { eager: true })
  @JoinColumn({ name: 'budget_unit_id' })
  unit!: BudgetUnit;

  @Exclude()
  @ManyToOne(() => Work, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work_id' })
  work!: Work;

  @Exclude()
  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses?: Expense[];
}
