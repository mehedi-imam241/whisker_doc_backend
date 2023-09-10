import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SymptomsService } from './symptoms.service';
import { Symptoms } from './models/symptoms.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { ServerResponse } from '../shared/operation.response';
import { CreateSymptomsInput } from './dtos/CreateSymptoms.input';
import { SearchSymptomsInput } from './dtos/SearchSymptoms.input';
import { TagsInput } from './dtos/Tags.input';
import { TagSearchResponse } from './dtos/search.response';

@Resolver()
export class SymptomsResolver {
  constructor(private symptomsService: SymptomsService) {}

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createSymptoms(
    @Args('input') input: CreateSymptomsInput,
    @Context() ctx,
  ) {
    console.log(input);

    return await this.symptomsService.createSymptoms(
      input,
      ctx.req.user.userId,
    );
  }

  @Query(() => [Symptoms])
  @UseGuards(JwtAuthGuard)
  async searchSymptoms(@Args('input') input: SearchSymptomsInput) {
    return await this.symptomsService.searchSymptoms(input);
  }

  @Query(() => [TagSearchResponse])
  @UseGuards(JwtAuthGuard)
  async searchSymptomsTags(@Args('input') input: string) {
    return await this.symptomsService.searchSymptomsTags(input);
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
  async verifySymptoms(@Args('symptomsId') symptomsId: number, @Context() ctx) {
    return await this.symptomsService.verifySymptoms(
      symptomsId,
      ctx.req.user.userId,
    );
  }

  @Query(() => Symptoms)
  @UseGuards(JwtAuthGuard)
  async getSymptomsById(@Args('symptomsId') symptomsId: number) {
    return await this.symptomsService.getSymptomsById(symptomsId);
  }
}
