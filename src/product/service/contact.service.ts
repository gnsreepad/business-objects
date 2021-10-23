import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, getManager, Repository } from 'typeorm';
import {
  CreateContact,
  GetContact,
  Opportunity,
  UpdateContact,
} from '../../schema/graphql.schema';
import { Contact } from '../entity/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly connection: Connection,
  ) {}

  /**
   * Function to find contact by name
   * @param name: name of contact
   * @returns: Contact record
   */
  getContactByName(name: string): Promise<GetContact> {
    return this.findContactAndOpportunity(name, undefined);
  }

  /**
   * Function to find contact by email
   * @param email: email of contact
   * @returns: Contact record
   */
  async getContactByEmail(email: string): Promise<GetContact> {
    const contact = await this.findContactAndOpportunity(undefined, email);
    return contact;
  }

  /**
   * Creates a contact
   * @param createContactInput: Contact record entries
   * @returns Created Contact
   */
  async createContact(createContactInput: CreateContact): Promise<Contact> {
    console.log(createContactInput);
    const newContact = this.contactRepository.create(createContactInput);
    const contact = await this.contactRepository.save(newContact);
    return contact;
  }

  /**
   * Updates a contact
   * @param createContactInput: Contact update record entries
   * @returns Updated Contact
   */
  async updateContact(
    email: string,
    updateContactInput: UpdateContact,
  ): Promise<Contact> {
    const currentContact = await this.findContact(undefined, email);
    const editContact: any = updateContactInput;
    editContact.id = currentContact.id;
    const contact = await this.contactRepository.save(editContact);
    return contact;
  }

  /**
   * Deletes a contact and contact entry in opportunity
   * @param email: contact email
   * @param transactionManager: running this as a transaction
   * @returns: Boolean
   */
  async deleteContact(
    email: string,
    transactionManager: EntityManager = getManager(this.connection.name),
  ) {
    console.log('Delete Started');
    const result = await this.findContactAndOpportunity(undefined, email);

    // opportunities linked to contact
    const listOpportunityId: string[] = result.opportunities.map(
      (opp) => opp.id,
    );

    // delete primary contact from oppportunity
    listOpportunityId.forEach(async (oppId) => {
      await transactionManager
        .createQueryBuilder()
        .update('opportunity')
        .set({
          primaryContact: 'contact deleted',
        })
        .where('id = :id', { id: oppId })
        .andWhere('primary_contact = :primary_contact', {
          primary_contact: email,
        })
        .execute();
    });

    // delete contact
    await transactionManager
      .createQueryBuilder()
      .delete()
      .from('opp_contact')
      .where('contact_id = :contact_id', { contact_id: result.contact.id })
      .execute();

    await transactionManager.delete(Contact, { email: email });
    return true;
  }

  /**
   * Function to convert opportunity to GQL type
   * @param opportunity: opportunity entity
   * @returns: Opportunity GQL type
   */
  private convertToGraphqlObject(opportunity: any[]): Opportunity[] {
    const convertedOpp = opportunity.map((opp) => {
      const modOpp: any = opp;
      modOpp.closeDate = opp.closeDate?.toString() || undefined;
      return modOpp;
    });
    return convertedOpp;
  }

  /**
   * Finds contact and opportunity linked to contact in DB
   * @param nameInput: name contact
   * @param emailInput: email contact
   * @returns: Contact record
   */
  private async findContactAndOpportunity(
    nameInput: string = undefined,
    emailInput: string = undefined,
  ): Promise<GetContact> {
    let result: Contact;
    if (nameInput) {
      result = await this.contactRepository.findOne({
        relations: ['opportunities'],
        where: { name: nameInput },
      });
    } else if (emailInput) {
      result = await this.contactRepository.findOne({
        relations: ['opportunities'],
        where: { email: emailInput },
      });
    }

    if (!result) {
      throw new NotFoundException('No Contact with given credentials exist');
    }
    // eslint-disable-next-line prettier/prettier
    const {id, name, email, account, address, title, mobilePhone, workPhone, opportunities} = result;
    const contactObj: GetContact = {
      // eslint-disable-next-line prettier/prettier
      contact: {id, name, email, account, address, title, mobilePhone, workPhone},
      opportunities: this.convertToGraphqlObject(opportunities),
    };
    return contactObj;
  }

  /**
   * Finds only contact in DB
   * @param nameInput: name contact
   * @param emailInput: email contact
   * @returns: Contact record
   */
  public async findContact(
    nameInput: string = undefined,
    emailInput: string = undefined,
  ): Promise<Contact> {
    let result: Contact;
    if (nameInput) {
      result = await this.contactRepository.findOne({
        where: { name: nameInput },
      });
    } else if (emailInput) {
      result = await this.contactRepository.findOne({
        where: { email: emailInput },
      });
    }

    if (!result) {
      throw new NotFoundException('No Contact with given credentials exist');
    }
    return result;
  }

  /**
   * Opportunities in DB
   * @returns List of contact email in the DB
   */
  async getAllContact() {
    const manager = getManager();
    const contact = await manager
      .createQueryBuilder()
      .select('email')
      .from(Contact, 'contact')
      .execute();
    return contact;
  }
}
