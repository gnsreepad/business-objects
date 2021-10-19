import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
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
  ) {}

  getContactByName(name: string): Promise<GetContact> {
    return this.findContactAndOpportunity(name, undefined);
  }

  async getContactByEmail(email: string): Promise<GetContact> {
    const contact = await this.findContactAndOpportunity(undefined, email);
    return contact;
  }

  async createContact(createContactInput: CreateContact): Promise<Contact> {
    console.log(createContactInput);
    const newContact = this.contactRepository.create(createContactInput);
    const contact = await this.contactRepository.save(newContact);
    return contact;
  }

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

  // async addOpportunity(email: string) {
  //   const opp = {
  //     name: 'hai',
  //     account: 'acc',
  //   };
  //   const newOpp = this.opportunityRepository.create(opp);
  //   const contact = await this.getContactByEmail(email);
  //   contact.opportunities = [newOpp];
  //   const savedcontact = await this.contactRepository.save(contact);
  //   return savedcontact;
  // }

  async deleteContact(email: string) {
    console.log('Delete Started');
    const manager = getManager();
    const contact = await this.findContact(undefined, email);
    console.log('contact', contact);
    await manager
      .createQueryBuilder()
      .delete()
      .from('opp_contact')
      .where('contact_id = :contact_id', { contact_id: contact.id })
      .execute();

    await this.contactRepository.delete({ email: email });
    return true;
  }

  private convertToGraphqlObject(opportunity: any[]): Opportunity[] {
    const convertedOpp = opportunity.map((opp) => {
      const modOpp: any = opp;
      modOpp.closeDate = opp.closeDate?.toString() || undefined;
      return modOpp;
    });
    return convertedOpp;
  }

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
}
