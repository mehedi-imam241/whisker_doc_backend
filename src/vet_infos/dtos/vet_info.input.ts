import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VetLocationInput {
  @Field(() => Number)
  lat: number;

  @Field(() => Number)
  lng: number;
}

@InputType()
export class VetInfoInput {
  @Field(() => VetLocationInput)
  location: VetLocationInput;

  @Field(() => String)
  certificateId: string;

  @Field(() => String)
  zoomLink: string;

  // @Field(() => String, { nullable: true })
  // certificateLink?: string;

  @Field(() => String)
  degree: string;
}
