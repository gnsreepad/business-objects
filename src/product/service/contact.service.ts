import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContact, UpdateContact } from '../../schema/graphql.schema';
import { Contact } from '../entity/contact.entity';
import { Opportunity } from '../entity/opportunity.entity';

@Injectable()
export class ContactSercie {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(Contact)
    private readonly opportunityRepository: Repository<Opportunity>,
  ) {}

  getContactByName(name: string): Promise<Contact> {
    return this.findContact(name, undefined);
  }

  getContactByEmail(email: string): Promise<Contact> {
    return this.findContact(undefined, email);
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
    const currentContact = await this.getContactByEmail(email);
    const editContact: any = updateContactInput;
    editContact.id = currentContact.id;
    const contact = await this.contactRepository.save(editContact);
    return contact;
  }

  async addOpportunity(email: string) {
    const opp = {
      name: 'hai',
      account: 'acc',
    };
    const newOpp = this.opportunityRepository.create(opp);
    const contact = await this.getContactByEmail(email);
    contact.opportunities = [newOpp];
    const savedcontact = await this.contactRepository.save(contact);
    return savedcontact;
  }

  private async findContact(
    name: string = undefined,
    email: string = undefined,
  ): Promise<Contact> {
    // console.log('name', name);
    // console.log('email', email);
    let result: Contact;
    if (name) {
      result = await this.contactRepository.findOne({
        where: { name: name },
      });
    } else if (email) {
      result = await this.contactRepository.findOne({
        where: { email: email },
      });
    }

    if (!result) {
      throw new NotFoundException('No Contact with given credentials exist');
    }
    return result;
  }
}
