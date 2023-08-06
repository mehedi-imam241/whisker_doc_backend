import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { RegisterInput } from '../auth/dtos/register.input';
import { SearchService } from '../search_drug/search.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private searchService: SearchService,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ _id: id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  async create(input: RegisterInput): Promise<User> {
    const createdUser = new User({
      ...input,
    });

    return this.userRepository.save(createdUser);
  }

  async searchDrugs(query: string) {
    return await this.searchService.search(query);
  }

  async getVets(limit: number, skip: number) {
    return await this.userRepository.find({
      where: {
        role: 'VET',
      },
      take: limit,
      skip: skip,
    });
  }

  async getVetsCount() {
    return await this.userRepository.count({
      where: {
        role: 'VET',
      },
    });
  }

  async getVet(id: string) {
    return await this.userRepository.findOneBy({
      _id: id,
    });
  }
}
