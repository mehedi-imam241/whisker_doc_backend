import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Review } from '../review/models/review.model';
import { ServerResponse } from '../shared/operation.response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { ReviewVetsService } from './review_vets.service';

@Resolver()
export class ReviewVetsResolver {
  constructor(private reviewService: ReviewVetsService) {}

  @Query(() => [Review])
  @UseGuards(JwtAuthGuard)
  async getReviewsOfVet(
    @Args('limit') limit: number,
    @Args('skip') skip: number,
    @Context() ctx,
  ) {
    return await this.reviewService.findAll(limit, skip, ctx.req.user.userId);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createReviewOfVet(
    @Args('review') review: string,
    @Args('vetId') vetId: string,
    @Context() ctx,
  ) {
    return await this.reviewService.createReview(
      review,
      vetId,
      ctx.req.user.userId,
    );
  }
}
