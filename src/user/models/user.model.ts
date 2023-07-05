import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Role)
  role: Role;
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  VET = 'VET',
  PARAVET = 'PARAVET',
}

registerEnumType(Role, {
  name: 'Role',
});
