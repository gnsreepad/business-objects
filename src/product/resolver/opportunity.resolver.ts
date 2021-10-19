import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateOpportunity,
  Opportunity,
  UpdateOpportunity,
} from '../../schema/graphql.schema';
import { OpportunityService } from '../service/opportunity.service';

@Resolver()
export class OpportunityResolver {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Query()
  async getOpportunityByName(
    @Args('name')
    name: string,
  ): Promise<Opportunity> {
    const opportunity = await this.opportunityService.getOpportunityByName(
      name,
    );
    return this.convertToGraphqlObject(opportunity);
  }

  @Query()
  async getOpportunityByAccount(
    @Args('account')
    account: string,
  ): Promise<Opportunity> {
    const opportunity = await this.opportunityService.getOpportunityByAccount(
      account,
    );
    console.log('opportunity', opportunity);
    return this.convertToGraphqlObject(opportunity);
  }

  @Mutation()
  async createOpportunity(
    @Args('createOpportunityInput')
    createOpportunityInput: CreateOpportunity,
  ): Promise<Opportunity> {
    const opportunity = await this.opportunityService.CreateOpportunity(
      createOpportunityInput,
    );
    return this.convertToGraphqlObject(opportunity);
  }

  @Mutation()
  async updateOpportunity(
    @Args('account')
    account: string,
    @Args('updateOpportunityInput')
    updateOpportunityInput: UpdateOpportunity,
  ): Promise<Opportunity> {
    const opportunity = await this.opportunityService.UpdateOpportunity(
      account,
      updateOpportunityInput,
    );
    return this.convertToGraphqlObject(opportunity);
  }

  @Mutation()
  async addContact(
    @Args('opportunityAccount')
    opportunityAccount: string,
    @Args('contactEmail')
    contactEmailList: string,
  ): Promise<Opportunity> {
    const opportunity = await this.opportunityService.addContact(
      opportunityAccount,
      contactEmailList,
    );
    console.log('opportunity', opportunity);
    return this.convertToGraphqlObject(opportunity);
  }

  @Mutation()
  async addPrimaryContact(
    @Args('opportunityAccount')
    opportunityAccount: string,
    @Args('primaryContactEmail')
    primaryContactEmail: string,
  ): Promise<Opportunity> {
    const opportunity = await this.opportunityService.addPrimaryContact(
      opportunityAccount,
      primaryContactEmail,
    );
    console.log('opportunity', opportunity);
    return this.convertToGraphqlObject(opportunity);
  }

  @Mutation()
  deleteOpportunity(
    @Args('opportunityAccount')
    opportunityAccount: string,
  ): Promise<boolean> {
    return this.opportunityService.deleteOpportunity(opportunityAccount);
  }

  private convertToGraphqlObject(opportunity): Opportunity {
    const convertedOpp: any = opportunity;
    convertedOpp.closeDate = opportunity.closeDate?.toString() || undefined;
    return convertedOpp;
  }
}
