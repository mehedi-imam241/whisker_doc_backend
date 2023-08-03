import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String)
  @IsStrongPassword()
  password: string;

  @Field((type) => Role)
  @IsNotEmpty()
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
