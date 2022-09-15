import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';

@Entity()
export class ProjectType extends BaseEntity {
  @Column()
  name!: string;
}
