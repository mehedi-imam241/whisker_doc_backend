import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagsInput {
  @Field(() => [String])
  tags: string[];
}
