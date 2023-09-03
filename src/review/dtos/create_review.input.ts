import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  comment: string;

  @Field(() => String)
  appointmentId: string;

  @Field(() => String)
  vetId: string;

  @Field(() => Number)
  rating: number;
}
