import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateBlogInput } from './dtos/createBlog.input';
import { ServerResponse } from '../shared/operation.response';
import { Blog } from './models/blog.model';
import { count } from 'rxjs';

@Resolver()
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createBlog(
    @Args('input') input: CreateBlogInput,
    @Context() ctx,
  ): Promise<ServerResponse> {
    const response: ServerResponse = new ServerResponse();

    try {
      const blog = await this.blogService.create(input, ctx.req.user.userId);
      if (!blog) {
        throw new Error('Error creating blog');
      }
      response.message = 'Blog created successfully';
    } catch (e) {
      response.message = e;
    }
    return response;
  }

  @Query(() => [Blog])
  async getBlogs(
    @Args('take') take: number,
    @Args('skip') skip: number,
  ): Promise<Blog[]> {
    return this.blogService.findAll(take, skip);
  }

  @Query(() => Blog)
  async getBlogById(@Args('id') id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Query(() => Number)
  async countPages(): Promise<number> {
    return this.blogService.findCount();
  }
}
