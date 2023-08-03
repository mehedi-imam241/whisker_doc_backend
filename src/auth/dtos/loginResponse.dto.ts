import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class LoginResponseDto {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;
}
