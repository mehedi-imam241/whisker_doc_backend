import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String)
  species: string;

  @Field(() => String)
  breed: string;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => Number)
  age: number;

  @Field(() => Number)
  weight: number;
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

registerEnumType(Gender, {
  name: 'Gender',
});
