import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import formatGraphqlError from '../exception/exception.formatter';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      useGlobalPrefix: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/schema/graphql.schema.ts'),
      },
      formatError: formatGraphqlError,
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
})
export class AppGraphQLModule {}
