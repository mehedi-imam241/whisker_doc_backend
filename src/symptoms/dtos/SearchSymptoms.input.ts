import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchSymptomsInput {
  @Field(() => String)
  species: string;

  @Field(() => [String])
  tags: string[];
}
