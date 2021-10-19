import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Opportunity } from './opportunity.entity';

@Entity()
@Unique('contact_name_key', ['name'])
@Unique('contact_email_key', ['email'])
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  account: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  workPhone?: string;

  @Column({ nullable: true })
  mobilePhone?: string;

  @ManyToMany(() => Opportunity, (opportunity) => opportunity.contacts)
  opportunities: Opportunity[];
}
