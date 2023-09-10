import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionCreateObject {
  @Field(() => String)
  subscriptionId: string;

  @Field(() => String)
  clientSecret: string;
}
