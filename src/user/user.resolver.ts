import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { SearchResponse } from '../search_drug/dtos/search.response';
import { ServerResponse } from 'src/shared/operation.response';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  // @Query(() => [User])
  // async users() {
  //   const users = await this.userService.findAll();
  //   return users;
  // }

  // @Query(() => [User], { name: 'users' })
  // @UseGuards(JwtAuthGuard)
  // getUsers() {
  //   return this.userService.findAll();
  // }

  @Query(() => [SearchResponse])
  @UseGuards(JwtAuthGuard)
  async searchDrug(@Args('query') query: string) {
    return await this.userService.searchDrugs(query);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getVet(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getVets(@Args('limit') limit: number, @Args('skip') skip: number) {
    return await this.userService.getVets(limit, skip);
  }

  @Query(() => Number)
  async getVetsCount() {
    return Math.ceil((await this.userService.getVetsCount()) / 10);
  }
  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async uploadUserAvatar(@Args('avatar') avatar: string, @Context() ctx) {
    return await this.userService.updateAvatar(ctx.req.user.userId, avatar);
  }
}
