import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { ProjectType } from './project-type.entity';

@Entity({ name: 'project' })
export class Project extends BaseEntity {
  @Index()
  @Column({ unique: true })
  description!: string;

  @Column({ name: 'client_name' })
  clientName!: string;

  @Column({ name: 'is_finished', default: false })
  isFinished!: boolean;

  @ManyToOne(() => ProjectType, { eager: true, nullable: true })
  @JoinColumn({ name: 'project_type_id' })
  type?: ProjectType;
}
