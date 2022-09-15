import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { BudgetUnit } from './budget-unit.entity';
import { Project } from '../../project/entities';
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
  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @Exclude()
  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses?: Expense[];
}
