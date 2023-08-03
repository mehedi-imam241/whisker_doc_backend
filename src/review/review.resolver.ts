import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './models/review.model';
import { ServerResponse } from '../shared/operation.response';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query(() => [Review])
  async getReviews(@Args('limit') limit: number, @Args('skip') skip: number) {
    return await this.reviewService.findAll(limit, skip);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createReview(@Args('review') review: string, @Context() ctx) {
    return await this.reviewService.createReview(review, ctx.req.user.userId);
  }
}
