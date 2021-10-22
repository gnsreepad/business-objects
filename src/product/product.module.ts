import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entity/contact.entity';
import { Opportunity } from './entity/opportunity.entity';
import { TransactionHelper } from './helpers/transaction.helper';
import { ContactResolver } from './resolver/contact.resolver';
import { OpportunityResolver } from './resolver/opportunity.resolver';
import { ContactService } from './service/contact.service';
import { OpportunityService } from './service/opportunity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Opportunity])],
  providers: [
    ContactService,
    ContactResolver,
    OpportunityService,
    OpportunityResolver,
    TransactionHelper,
  ],
})
export class ProductModule {}
