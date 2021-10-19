import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateOpportunity,
  UpdateOpportunity,
} from '../../schema/graphql.schema';
import { Opportunity } from '../entity/opportunity.entity';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
  ) {}

  async getOpportunityByName(name: string): Promise<Opportunity> {
    const opportunity = this.opportunityRepository.findOne({
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
}
