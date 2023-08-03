import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateSymptomsInput {
  @Field(() => String)
  species: string;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  article: string;
}
