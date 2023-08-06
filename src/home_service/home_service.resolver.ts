import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServerResponse } from '../shared/operation.response';
import { HomeServiceService } from './home_service.service';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { HomeService } from './models/home_service.model';

@Resolver()
export class HomeServiceResolver {
  constructor(private homeServiceService: HomeServiceService) {}

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async JoinHomeService(@Context() ctx) {
    return this.homeServiceService.JoinHomeService(ctx.req.user.userId);
  }

  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async bookSlots(
  //   @Args('slotId') slotId: string,
  //   @Args('dateScheduleId') dateScheduleId: string,
  //   @Context() ctx,
  // ) {
  //   return this.homeServiceService.bookSlot(
  //     slotId,
  //     ctx.req.user.userId,
  //     dateScheduleId,
  //   );
  // }

  @Query(() => [HomeService])
  @UseGuards(JwtAuthGuard)
  async getHomeServiceVets(
    @Args('limit') limit: number,
    @Args('skip') skip: number,
  ): Promise<HomeService[]> {
    return await this.homeServiceService.getHomeServiceVets(limit, skip);
  }
}
