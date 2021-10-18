import { Query, Resolver } from '@nestjs/graphql';
import { ContactSercie } from '../service/contact.service';

@Resolver('Contact')
export class ContactResolver {
  constructor(private readonly contactService: ContactSercie) {}
}
