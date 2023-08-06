import { Injectable } from '@nestjs/common';
import { Blog } from './models/blog.model';
import { CreateBlogInput } from './dtos/createBlog.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async create(
    createBlogDto: CreateBlogInput,
    authorId: string,
  ): Promise<Blog> {
    const createdBlog = new Blog({
      ...createBlogDto,
      authorId: authorId,
    });

    return this.blogRepository.save(createdBlog);
  }

  async findAll(count: number, skip: number): Promise<Blog[]> {
    return this.blogRepository.find({
      take: count,
      skip: skip,
      relations: {
        author: true,
      },
    });
  }

  async findCount(): Promise<number> {
    return Math.ceil((await this.blogRepository.count()) / 10);
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogRepository.findOne({
      where: {
        _id: id,
      },
      relations: {
        author: true,
      },
    });
  }
}
