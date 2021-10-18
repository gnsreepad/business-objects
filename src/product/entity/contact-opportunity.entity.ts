import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Contact } from './contact.entity';
import { Opportunity } from './opportunity.entity';

@Entity()
export class ContactOpportunity {
  @PrimaryColumn()
  contactId: string;

  @PrimaryColumn()
  opportunityId: string;

  @ManyToOne(() => Contact, (contact) => contact.opportunityConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'contactId' })
  contact: Promise<Contact>;

  @ManyToOne(
    () => Opportunity,
    (opportunity) => opportunity.contactConnection,
    {
      primary: true,
    },
  )
  @JoinColumn({ name: 'opportunityId' })
  opportunity: Promise<Contact>;
}
