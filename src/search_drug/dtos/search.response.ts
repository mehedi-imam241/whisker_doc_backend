import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchResponse {
  @Field(() => String)
  Drug: string;

  @Field(() => String)
  Use: string;
}
