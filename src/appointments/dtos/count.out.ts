import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountObject {
  @Field(() => Number)
  count: number;
}
