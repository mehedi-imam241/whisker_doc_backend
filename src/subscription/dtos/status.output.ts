import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class plan {
  @Field()
  id: string;
  @Field()
  object: string;
  @Field()
  active: boolean;
  @Field()
  amount: number;
}

@ObjectType()
export class StatusOutput {
  @Field()
  id: string;
  @Field()
  object: string;
  @Field()
  currency: string;
  @Field()
  current_period_end: number;
  @Field()
  current_period_start: number;
  @Field()
  customer: string;

  @Field()
  plan: plan;
}
