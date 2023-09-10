import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  default_price: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  images: string[];

  @Field(() => Number)
  My_Price: number;
}
