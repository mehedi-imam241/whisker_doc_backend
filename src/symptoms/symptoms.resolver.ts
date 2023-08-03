import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SymptomsService } from './symptoms.service';
import { Symptoms } from './models/symptoms.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { ServerResponse } from '../shared/operation.response';
import { CreateSymptomsInput } from './dtos/CreateSymptoms.input';

@Resolver()
export class SymptomsResolver {
  constructor(private symptomsService: SymptomsService) {}

  @Query(() => [Symptoms])
  @UseGuards(JwtAuthGuard)
  async searchSymptoms(@Args('searchTerm') searchTerm: string) {
    return await this.symptomsService.searchSymptoms(searchTerm);
  }

  @Query(() => [Symptoms])
  @UseGuards(JwtAuthGuard)
  async getVerfiedSymptoms(
    @Args('limit') limit: number,
    @Args('skip') skip: number,
  ) {
    return await this.symptomsService.getVerfiedSymptoms(limit, skip);
  }

  @Query(() => [Symptoms])
  @UseGuards(JwtAuthGuard)
  async getUnverfiedSymptoms(
    @Args('limit') limit: number,
    @Args('skip') skip: number,
  ) {
    return await this.symptomsService.getUnverfiedSymptoms(limit, skip);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async verifySymptoms(@Args('symptomsId') symptomsId: string, @Context() ctx) {
    return await this.symptomsService.verifySymptoms(
      symptomsId,
      ctx.req.user.userId,
    );
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createSymptoms(
    @Args('input') input: CreateSymptomsInput,
    @Context() ctx,
  ) {
    return await this.symptomsService.createSymptoms(
      input,
      ctx.req.user.userId,
    );
  }
}
