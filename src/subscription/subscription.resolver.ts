import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { ServerResponse } from '../shared/operation.response';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { StatusOutput } from './dtos/status.output';

@Resolver()
export class SubscriptionResolver {
  constructor(private subscriptionService: SubscriptionService) {}

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createSubscription() {
    const returnval = await this.subscriptionService.createSubscription(
      'abcd',
      'abcd',
    );
    console.log(returnval);
    return { message: 'Subscription created successfully' } as ServerResponse;
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async resumeSubscription() {
    const returnval = await this.subscriptionService.resumeSubscription('abcd');
    console.log(returnval);
    return { message: 'Subscription resumed successfully' } as ServerResponse;
  }

  @Query(() => StatusOutput)
  @UseGuards(JwtAuthGuard)
  async getSubscriptionStatus() {
    const returnval = await this.subscriptionService.retrieveSubscription(
      'abcd',
    );

    return returnval as unknown as StatusOutput;
  }
}
