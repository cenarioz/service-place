import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true,
      context: ({req}) => {
          return {req};
      },
      cors: {
          credentials: true,
          origin: true,
      },
    }),
  ],
})
export class GraphqlModule {}