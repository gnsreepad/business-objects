import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Risk } from '../../schema/graphql.schema';
import { BaseEntity } from './base.entity';
import { Contact } from './contact.entity';

@Entity()
@Unique('opportunity_name_key', ['name'])
@Unique('opportunity_account_key', ['account'])
export class Opportunity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  account!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  winPercentage?: number;

  @Column({ nullable: true })
  primaryContact?: string;

  @Column({ nullable: true })
  closeDate?: Date;

  @Column({ nullable: true })
  estimatedRevenue?: string;

  @Column({ nullable: true })
  riskLevel?: Risk;

  @ManyToMany(() => Contact, (contact) => contact.opportunities, {
    cascade: true,
  })
  @JoinTable({
    name: 'opp_contact',
    joinColumn: {
      name: 'opportunity_id',
    },
    inverseJoinColumn: {
      name: 'contact_id',
    },
  })
  contacts?: Contact[];
}
