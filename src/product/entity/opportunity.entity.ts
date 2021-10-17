import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Opportunity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
