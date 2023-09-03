import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './models/review.model';
import { ServerResponse } from '../shared/operation.response';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateReviewInput } from './dtos/create_review.input';

@Resolver()
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Args('review') review: CreateReviewInput,
    @Context() ctx,
  ) {
    return await this.reviewService.createReview(review, ctx.req.user.userId);
  }


  @Query(()=>[Review])
  async findReviewsByVetId(@Args('vetId') vetId: string){
    return await this.reviewService.findReviewsByVetId(vetId);
  }

  @Query(()=>[Review])
  async findMyReviews(@Context() ctx){
    return await this.reviewService.findReviewsByVetId(ctx.req.user.userId);
  }

  @Query(()=>Review)
  async findReviewByAppointmentId(@Args('apptId') apptId: string){
    return await this.reviewService.findReviewByAppointmentId(apptId);
  }

}
