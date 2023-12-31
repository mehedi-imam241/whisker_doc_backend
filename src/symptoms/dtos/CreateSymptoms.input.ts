import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSymptomsInput {
  @Field(() => String)
  species: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  article: string;

  @Field(() => [String])
  tags: string[];
}
