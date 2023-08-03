import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerificationRequestInput {
  @Field(() => String)
  certificateId: string;

  @Field(() => String)
  certificateLink: string;
}