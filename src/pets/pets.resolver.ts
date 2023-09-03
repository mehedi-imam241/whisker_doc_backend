import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './models/pet.model';
import { ServerResponse } from '../shared/operation.response';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CreatePetInput } from './dtos/createPet.input';

@Resolver()
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(() => [Pet])
  @UseGuards(JwtAuthGuard)
  async getAllPets(@Context() ctx): Promise<Pet[]> {
    return await this.petsService.findAll(ctx.req.user.userId);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createPet(
    @Args('input') input: CreatePetInput,
    @Context() ctx,
  ): Promise<ServerResponse> {
    return await this.petsService.create(input, ctx.req.user.userId);
  }

  @Query(() => Pet)
  @UseGuards(JwtAuthGuard)
  async getPetById(@Args('id') id: string, @Context() ctx): Promise<Pet> {
    return await this.petsService.findById(id, ctx.req.user.userId);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async uploadPetAvatar(
    @Args('avatar') avatar: string,
    @Args('petId') petId: string,
    @Context() ctx,
  ) {
    return await this.petsService.uploadAvatar(
      ctx.req.user.userId,
      petId,
      avatar,
    );
  }
}
