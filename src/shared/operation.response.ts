import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServerResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Boolean, { nullable: true })
  success?: boolean;
}
