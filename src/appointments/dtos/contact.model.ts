import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactObject {
  @Field(() => String)
  zoomLink: string;
}
