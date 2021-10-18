import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
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
}
