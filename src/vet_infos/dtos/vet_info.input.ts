import { Field, InputType } from '@nestjs/graphql';
import { LocationInput } from './location.input';



@InputType()
export class VetInfoInput {
  @Field(() => LocationInput)
  location: LocationInput;

  @Field(() => String)
  certificateId: string;

  @Field(() => String)
  zoomLink: string;

  // @Field(() => String, { nullable: true })
  // certificateLink?: string;

  @Field(() => String)
  degree: string;
}
