import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Payment } from '../../payment/entities';
import { Exclude } from 'class-transformer';
import { Project } from '../../project/entities';

@Entity({ name: 'budget_income' })
export class Income extends BaseEntity {
  @Exclude()
  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @Column()
  description!: string;

  @ManyToMany(() => Payment, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({
    name: 'budget_income_payments',
    joinColumn: {
      name: 'income_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'payment_id',
      referencedColumnName: 'id',
    },
  })
  payments?: Payment[];
}
