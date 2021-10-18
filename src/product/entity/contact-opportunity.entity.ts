import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Contact } from './contact.entity';
import { Opportunity } from './opportunity.entity';

@Entity()
export class ContactOpportunity {
  @ManyToOne(() => Contact, (contact) => contact.opportunityConnection)
  @JoinColumn({ name: 'contact_id' })
  contactId: string;

  @ManyToOne(() => Opportunity, (opportunity) => opportunity.contactConnection)
  @JoinColumn({ name: 'opportunity_id' })
  opportunityId: string;
}
