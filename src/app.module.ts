import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppGraphQLModule } from './graphql/graphql.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    AppGraphQLModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
