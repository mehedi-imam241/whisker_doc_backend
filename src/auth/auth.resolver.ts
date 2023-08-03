import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/loginResponse.dto';
import { LoginInput } from './dtos/login.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './localAuth.guard';
import { User } from '../user/models/user.model';
import { RegisterInput } from './dtos/register.input';
import { SubscriptionService } from '../subscription/subscription.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
  ) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx,
  ): Promise<LoginResponseDto> {
    return this.authService.login(ctx.user);
  }

  @Mutation(() => User)
  async register(
    @Args('input', { type: () => RegisterInput }) input: RegisterInput,
  ): Promise<User> {
    // const customer = await this.subscriptionService.createCustomer(
    //   input.email,
    //   'paymentmethodId',
    // );
    // console.log(customer);

    const user = await this.authService.register(input);
    return user;
  }
}
