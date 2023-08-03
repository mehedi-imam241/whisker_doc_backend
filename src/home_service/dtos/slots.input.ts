import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SlotsInput {
  @Field(() => String)
  homeServiceId: string;

  @Field(() => String)
  starts_at: string;
  @Field(() => String)
  ends_at: string;
  @Field(() => String, { nullable: true })
  occupiedByUser?: string;
}
