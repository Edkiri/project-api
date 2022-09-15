import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../database/entities/base.entity-abstract';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @Column()
  owner!: string;

  @Column()
  platform!: string;

  @Column()
  currency!: string;

  @Column({ type: 'float' })
  balance!: number;
}
