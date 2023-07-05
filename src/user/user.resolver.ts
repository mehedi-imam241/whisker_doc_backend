import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async author() {
    return 'Hello ami vat khai';
  }
}
