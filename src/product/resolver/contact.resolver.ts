import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Contact,
  CreateContact,
  GetContact,
  UpdateContact,
} from '../../schema/graphql.schema';
import { TransactionHelper } from '../helpers/transaction.helper';
import { ContactService } from '../service/contact.service';

@Resolver('Contact')
export class ContactResolver {
  constructor(
    private readonly contactService: ContactService,
    private readonly transactionHelper: TransactionHelper,
  ) {}

  @Query()
  async getContactByName(
    @Args('name')
    name: string,
  ): Promise<GetContact> {
    const data = await this.contactService.getContactByName(name);
    console.log(data);
    return data;
  }

  @Query()
  getContactByEmail(
    @Args('email')
    email: string,
  ): Promise<GetContact> {
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

  @Mutation()
  async deleteContact(
    @Args('email')
    email: string,
  ): Promise<boolean> {
    const result = await this.transactionHelper.executeTransaction(
      this.contactService.deleteContact.bind(this.contactService),
      email,
    );
    return result;
  }

  @Query()
  getAllContact() {
    return this.contactService.getAllContact();
  }
}
