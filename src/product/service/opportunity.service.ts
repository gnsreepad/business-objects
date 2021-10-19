import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateOpportunity,
  UpdateOpportunity,
} from '../../schema/graphql.schema';
import { Contact } from '../entity/contact.entity';
import { Opportunity } from '../entity/opportunity.entity';
import { ContactService } from './contact.service';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
  ) {}

  async getOpportunityByName(name: string): Promise<Opportunity> {
    const opportunity = this.opportunityRepository.findOne({
      relations: ['contacts'],
      where: { name: name },
    });

    if (!opportunity) {
      throw new NotFoundException(
        'No opportunity with given credentials exist',
      );
    }

    return opportunity;
  }

  async getOpportunityByAccount(account: string): Promise<Opportunity> {
    const opportunity = this.opportunityRepository.findOne({
      relations: ['contacts'],
      where: { account: account },
    });

    if (!opportunity) {
      throw new NotFoundException(
        'No opportunity with given credentials exist',
      );
    }

    return opportunity;
  }

  async CreateOpportunity(
    opportunityInput: CreateOpportunity,
  ): Promise<Opportunity> {
    const newOpportunity = this.opportunityRepository.create(opportunityInput);
    const opportunity = await this.opportunityRepository.save(newOpportunity);
    return opportunity;
  }

  async UpdateOpportunity(
    account: string,
    updateOpportunityInput: UpdateOpportunity,
  ): Promise<Opportunity> {
    const currentOpporunity = await this.getOpportunityByAccount(account);
    const editOpportunity: any = updateOpportunityInput;
    editOpportunity.id = currentOpporunity.id;
    const opportunity = this.opportunityRepository.save(editOpportunity);
    return opportunity;
  }

  async addContact(
    opportunityAccount: string,
    contactEmail: string,
  ): Promise<Opportunity> {
    // const contactList = contactEmailList.map((contactEmail) => {
    //   const contact = this.contactService.getContactByEmail(contactEmail);
    //   return contact;
    // });

    const contact: Contact = await this.contactService.findContact(
      undefined,
      contactEmail,
    );

    const opportunity = await this.getOpportunityByAccount(opportunityAccount);
    opportunity.contacts.push(contact);
    const newOpportunity = await this.opportunityRepository.save(opportunity);
    return newOpportunity;
  }

  async addPrimaryContact(
    opportunityAccount: string,
    contactEmail: string,
  ): Promise<Opportunity> {
    const contact: Contact = await this.contactService.findContact(
      undefined,
      contactEmail,
    );
    const opportunity = await this.getOpportunityByAccount(opportunityAccount);
    opportunity.contacts.push(contact);
    opportunity.primaryContact = contactEmail;
    const newOpportunity = await this.opportunityRepository.save(opportunity);
    return newOpportunity;
  }

  async deleteOpportunity(opportunityAccount: string) {
    await this.opportunityRepository.delete({ account: opportunityAccount });
    return true;
  }
}
