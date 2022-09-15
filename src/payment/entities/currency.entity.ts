import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../database/entities/base.entity-abstract';

@Entity({ name: 'account_currency' })
export class Currency extends BaseEntity {
  @Column({ unique: true })
  name!: string;
}
