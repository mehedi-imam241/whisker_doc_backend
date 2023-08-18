import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VetInfoInput } from './dtos/vet_info.input';
import { VetInfoService } from './vet_info.service';
import { ServerResponse } from '../shared/operation.response';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { VetInfo } from './models/vet_info.model';

@Resolver()
export class VetInfoResolver {
  constructor(private VetInfoService: VetInfoService) {}

  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async createVerificationRequest(
  //   @Args('input') input: VetInfoInput,
  //   @Context() ctx,
  // ) {
  //   return this.VetInfoService.createVerificationRequest(
  //     input,
  //     ctx.req.user,
  //   );
  // }
  //
  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async verifyVet(@Args('vetId') vetId: string, @Context() ctx) {
  //   return this.VetInfoService.verifyVet(vetId, ctx.req.user);
  // }
  //
  // @Query(() => [VetInfo])
  // @UseGuards(JwtAuthGuard)
  // async getVerificationRequestsAdmin(
  //   @Args('limit') limit: number,
  //   @Args('skip') skip: number,
  //   @Context() ctx,
  // ) {
  //   return this.VetInfoService.getVerificationRequestsAdmin(
  //     limit,
  //     skip,
  //     ctx.req.user,
  //   );
  // }
  //
  // @Query(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async getVerificationStatus(vetId: string, @Context() ctx) {
  //   return this.VetInfoService.getVerificationStatus(
  //     ctx.req.user.userId,
  //   );
  // }

  @Query(() => VetInfo)
  @UseGuards(JwtAuthGuard)
  async getMyInfo(@Context() ctx) {
    return this.VetInfoService.getVetInfo(ctx.req.user.userId);
  }

  @Query(() => VetInfo, { nullable: true })
  async getVetInfo(@Args('vetId') vetId: string) {
    return this.VetInfoService.getVetInfo(vetId);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async UpdateVetInfo(@Args('input') input: VetInfoInput, @Context() ctx) {
    return this.VetInfoService.updateVetInfo(input, ctx.req.user.userId);
  }
}
