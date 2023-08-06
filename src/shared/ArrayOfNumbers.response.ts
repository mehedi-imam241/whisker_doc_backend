import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArrayOfNumbersResponse {
  @Field(() => [Number], { nullable: true })
  ids: number[];
}
