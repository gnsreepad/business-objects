import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Contact,
  CreateContact,
  UpdateContact,
} from '../../schema/graphql.schema';
import { ContactService } from '../service/contact.service';

@Resolver('Contact')
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query()
  getContactByName(
    @Args('name')
    name: string,
  ): Promise<Contact> {
    return this.contactService.getContactByName(name);
  }

  @Query()
  getContactByEmail(
    @Args('email')
    email: string,
  ): Promise<Contact> {
    return this.contactService.getContactByEmail(email);
  }

  @Mutation()
  async createContact(
    @Args('createContactInput')
    createContactInput: CreateContact,
  ): Promise<Contact> {
    const result = this.contactService.createContact(createContactInput);
    return result;
  }

  @Mutation()
  updateContact(
    @Args('email')
    email: string,
    @Args('updateContactInput')
    updateContactInput: UpdateContact,
  ): Promise<Contact> {
    return this.contactService.updateContact(email, updateContactInput);
  }
}
