import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Work } from '../../work/entities';
import { BudgetUnit } from './budget-unit.entity';

@Entity({ name: 'budget' })
export class Budget extends BaseEntity {
  @Column()
  description!: string;

  @Column({ type: 'numeric' })
  quantity!: number;

  @Column({ name: 'unit_price', type: 'numeric' })
  unitPrice!: number;

  @Exclude()
  @ManyToOne(() => Work)
  @JoinColumn({ name: 'work_id' })
  work!: Work;

  @ManyToOne(() => BudgetUnit, { eager: true })
  @JoinColumn({ name: 'budget_unit_id' })
  unit!: BudgetUnit;
}
