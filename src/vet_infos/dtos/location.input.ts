import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field(() => Number)
  lat: number;

  @Field(() => Number)
  lng: number;
}