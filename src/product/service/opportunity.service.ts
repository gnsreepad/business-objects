import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
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

  /**
   * Finds opportunity and contact listed to an opportunity
   * @param name opportunity name
   * @returns opportunity and contact listed
   */
  async getOpportunityByName(name: string): Promise<Opportunity> {
    let opportunity;
    try {
      opportunity = this.opportunityRepository.findOne({
        relations: ['contacts'],
        where: { name: name },
      });
    } catch (err) {
      throw new Error('No opportunity with given credentials exist');
    }

    if (!opportunity) {
      throw new NotFoundException(
        'No opportunity with given credentials exist',
      );
    }

    return opportunity;
  }

  /**
   * Finds opportunity and contact listed to an opportunity
   * @param account opportunity account
   * @returns opportunity and contact listed
   */
  async getOpportunityByAccount(account: string): Promise<Opportunity> {
    let opportunity;
    try {
      opportunity = this.opportunityRepository.findOne({
        relations: ['contacts'],
        where: { account: account },
      });
    } catch {
      throw new Error('No opportunity with given credentials exist');
    }

    if (!opportunity) {
      throw new NotFoundException(
        'No opportunity with given credentials exist',
      );
    }

    return opportunity;
  }

  /**
   * Created an opportunity
   * @param opportunityInput opportunity input fields
   * @returns opportunity record added in DB
   */
  async CreateOpportunity(
    opportunityInput: CreateOpportunity,
  ): Promise<Opportunity> {
    const newOpportunity = this.opportunityRepository.create(opportunityInput);
    const opportunity = await this.opportunityRepository.save(newOpportunity);
    return opportunity;
  }

  /**
   * Update an opportunity
   * @param updateOpportunityInput opportunity update fields
   * @returns opportunity record updated in DB
   */
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

  /**
   * Add contact to an opportunity
   * @param opportunityAccount: account of opportunity
   * @param contactEmail: contact email
   * @returns returns updated opportunity
   */
  async addContact(
    opportunityAccount: string,
    contactEmail: string,
  ): Promise<Opportunity> {
    const contact: Contact = await this.contactService.findContact(
      undefined,
      contactEmail,
    );

    const opportunity = await this.getOpportunityByAccount(opportunityAccount);
    opportunity.contacts.push(contact);
    const newOpportunity = await this.opportunityRepository.save(opportunity);
    return newOpportunity;
  }

  /**
   * Function to add a primary contact to opportunity
   * @param opportunityAccount
   * @param contactEmail
   * @returns
   */
  async addPrimaryContact(
    opportunityAccount: string,
    contactEmail: string,
  ): Promise<boolean> {
    const contact: Contact = await this.contactService.findContact(
      undefined,
      contactEmail,
    );
    console.log('contact', contact);
    const opportunity = await this.getOpportunityByAccount(opportunityAccount);
    const contactInOpportunity: string[] = opportunity.contacts.map(
      (item) => item.email,
    );
    console.log('contact list of opp', contactInOpportunity);
    if (!contactInOpportunity.includes(contactEmail)) {
      throw new Error('Contact not linked to Opportunity');
    }
    opportunity.primaryContact = contactEmail;
    await this.opportunityRepository.save(opportunity);
    return true;
  }

  /**
   * Delete an Opportunity
   * @param opportunityAccount: opportunity Account
   * @returns boolean
   */
  async deleteOpportunity(opportunityAccount: string) {
    await this.opportunityRepository.delete({ account: opportunityAccount });
    return true;
  }

  /**
   * All opportunity
   * @returns List of all opportunity account name in DB
   */
  async getAllOpportunity() {
    const manager = getManager();
    const opportuntiy = await manager
      .createQueryBuilder()
      .select('account')
      .from(Opportunity, 'opportunity')
      .execute();
    return opportuntiy;
  }
}
