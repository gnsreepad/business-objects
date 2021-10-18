import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContact, UpdateContact } from '../../schema/graphql.schema';
import { Contact } from '../entity/contact.entity';

@Injectable()
export class ContactSercie {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  getContactByName(name: string): Promise<Contact> {
    return this.findContact((name = name));
  }

  getContactByEmail(email: string): Promise<Contact> {
    return this.findContact((email = email));
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

  private async findContact(
    name: string = undefined,
    email: string = undefined,
  ): Promise<Contact> {
    let result: Contact;
    if (name) {
      result = await this.contactRepository.findOne({
        where: { name: name },
      });
    } else if (email) {
      result = await this.contactRepository.findOne({
        where: { name: name },
      });
    }

    if (!result) {
      throw new NotFoundException('No Contact with given credentials exist');
    }
    return result;
  }
}
