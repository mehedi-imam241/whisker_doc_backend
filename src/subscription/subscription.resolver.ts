import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { ServerResponse } from '../shared/operation.response';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { StatusOutput } from './dtos/status.output';
import { SubscriptionCreateObject } from './dtos/subscription.output';
import { ProductObject } from './dtos/products.output';

@Resolver()
export class SubscriptionResolver {
  constructor(private subscriptionService: SubscriptionService) {}

  @Mutation(() => SubscriptionCreateObject)
  @UseGuards(JwtAuthGuard)
  async createSubscription(@Context() ctx, @Args('priceId') priceId: string) {
    return await this.subscriptionService.createSubscription(
      ctx.req.user.userId,
      priceId,
    );
  }

  @Query(() => [ProductObject])
  async getAllProducts() {
    return await this.subscriptionService.getAllProducts();
  }

  @Query(() => [StatusOutput], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getSubscriptionStatus(@Context() ctx) {
    return await this.subscriptionService.checkSubscriptionStatus(
      ctx.req.user.userId,
    );
  }

  @Query(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async checkIfSubscriptionActive(@Context() ctx) {
    return await this.subscriptionService.checkIfSubscriptionActive(
      ctx.req.user.userId,
    );
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async cancelSubscription(@Args('subscriptionId') subscriptionId: string) {
    return await this.subscriptionService.cancelSubscription(subscriptionId);
  }

  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async resumeSubscription() {
  //   const returnval = await this.subscriptionService.resumeSubscription('abcd');
  //   console.log(returnval);
  //   return { message: 'Subscription resumed successfully' } as ServerResponse;
  // }

  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async createPaymentMethod() {
  //   const returnval = await this.subscriptionService.createPaymentMethod();
  //   console.log(returnval);
  //   return { message: 'Subscription resumed successfully' } as ServerResponse;
  // }

  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async CreatePaymentIntent() {
  //   const returnval = await this.subscriptionService.createPaymentIntent(
  //     'abcd',
  //   );
  //   console.log(returnval);
  //   return { message: 'Subscription resumed successfully' } as ServerResponse;
  // }

  // @Query(() => StatusOutput)
  // @UseGuards(JwtAuthGuard)
  // async getSubscriptionStatus() {
  //   const returnval = await this.subscriptionService.retrieveSubscription(
  //     'abcd',
  //   );

  //   return returnval as unknown as StatusOutput;
  // }

  // @Query(() => ServerResponse)
  // async adjustSubscription() {
  //   console.log(await this.subscriptionService.getAllCustomers());
  //   return { message: 'Subscription resumed successfully' } as ServerResponse;
  // }
}
