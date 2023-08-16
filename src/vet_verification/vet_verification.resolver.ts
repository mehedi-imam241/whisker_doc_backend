import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VerificationRequestInput } from './dtos/VerificationRequest.intput';
import { VetVerificationService } from './vet_verification.service';
import { ServerResponse } from '../shared/operation.response';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { VetVerification } from './models/vet_verification.model';

@Resolver()
export class VetVerificationResolver {
  constructor(private vetVerificationService: VetVerificationService) {}

  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async createVerificationRequest(
  //   @Args('input') input: VerificationRequestInput,
  //   @Context() ctx,
  // ) {
  //   return this.vetVerificationService.createVerificationRequest(
  //     input,
  //     ctx.req.user,
  //   );
  // }
  //
  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async verifyVet(@Args('vetId') vetId: string, @Context() ctx) {
  //   return this.vetVerificationService.verifyVet(vetId, ctx.req.user);
  // }
  //
  // @Query(() => [VetVerification])
  // @UseGuards(JwtAuthGuard)
  // async getVerificationRequestsAdmin(
  //   @Args('limit') limit: number,
  //   @Args('skip') skip: number,
  //   @Context() ctx,
  // ) {
  //   return this.vetVerificationService.getVerificationRequestsAdmin(
  //     limit,
  //     skip,
  //     ctx.req.user,
  //   );
  // }
  //
  // @Query(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async getVerificationStatus(vetId: string, @Context() ctx) {
  //   return this.vetVerificationService.getVerificationStatus(
  //     ctx.req.user.userId,
  //   );
  // }

  @Query(() => VetVerification)
  @UseGuards(JwtAuthGuard)
  async getMyVerificationInfo(@Context() ctx) {
    return this.vetVerificationService.getVerification(ctx.req.user.userId);
  }

  @Query(() => VetVerification)
  @UseGuards(JwtAuthGuard)
  async getVetVerificationInfo(@Args('vetId') vetId: string) {
    return this.vetVerificationService.getVerification(vetId);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async UpdateVerification(
    @Args('input') input: VerificationRequestInput,
    @Context() ctx,
  ) {
    return this.vetVerificationService.updateVerification(
      input,
      ctx.req.user.userId,
    );
  }
}
