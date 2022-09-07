import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';

@Entity({ name: 'budget_unit' })
export class BudgetUnit extends BaseEntity {
  @Column()
  name!: string;
}
