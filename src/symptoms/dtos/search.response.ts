import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagSearchResponse {
  @Field(() => String)
  Symptom: string;

  @Field(() => String)
  Disease: string;
}
