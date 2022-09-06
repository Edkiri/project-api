import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { WorkType } from './work-type.entity';

@Entity({ name: 'work' })
export class Work extends BaseEntity {
  @Column()
  description!: string;

  @Column({ name: 'client_name' })
  clientName!: string;

  @Column({ name: 'is_finished', default: false })
  isFinished: boolean;

  @ManyToOne(() => WorkType, { eager: true, nullable: true })
  @JoinColumn({ name: 'work_type_id' })
  type?: WorkType;
}
