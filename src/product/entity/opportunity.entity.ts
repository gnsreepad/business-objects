import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Risk } from '../../schema/graphql.schema';
import { BaseEntity } from './base.entity';
import { ContactOpportunity } from './contact-opportunity.entity';
import { Contact } from './contact.entity';

@Entity()
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

  @OneToMany(() => ContactOpportunity, (co) => co.opportunityId)
  contactConnection: Promise<ContactOpportunity[]>;
}
