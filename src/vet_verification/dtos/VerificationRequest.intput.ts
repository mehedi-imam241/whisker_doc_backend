import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerificationRequestInput {
  @Field(() => String)
  certificateId: string;

  // @Field(() => String, { nullable: true })
  // certificateLink?: string;

  @Field(() => String)
  degree: string;
}
