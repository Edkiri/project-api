import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';

@Entity()
export class WorkType extends BaseEntity {
  @Column()
  name!: string;
}
