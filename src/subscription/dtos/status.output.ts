import { Field, ObjectType } from '@nestjs/graphql';
import { ProductObject } from './products.output';

@ObjectType()
class plan {
  @Field()
  id: string;
  @Field()
  active: boolean;
  @Field()
  amount: number;
  @Field()
  product: ProductObject;
}

@ObjectType()
export class StatusOutput {
  @Field()
  id: string;

  @Field()
  currency: string;
  @Field()
  current_period_end: number;
  @Field()
  current_period_start: number;

  @Field(() => Number, { nullable: true })
  canceled_at: number;

  @Field()
  plan: plan;
}
