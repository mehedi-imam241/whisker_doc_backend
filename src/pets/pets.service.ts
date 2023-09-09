import { Injectable } from '@nestjs/common';
import { Pet } from './models/pet.model';
import { CreatePetInput } from './dtos/createPet.input';
import { ServerResponse } from '../shared/operation.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    private userService: UserService,
  ) {}

  async findAll(ownerId: string): Promise<Pet[]> {
    return await this.petRepository.find({
      where: {
        owner: {
          _id: ownerId,
        },
      },
    });
  }

  async findById(_id: string, userId: string): Promise<Pet> {
    return await this.petRepository.findOneBy({
      _id,
      owner: {
        _id: userId,
      },
    });
  }

  async create(input: CreatePetInput, ownerId: string) {
    const response: ServerResponse = new ServerResponse();
    try {
      // const createdPet = this.petRepository.create({
      //   ...input,
      //   owner: ownerId,
      // });

      const user = await this.userService.findOne(ownerId);

      const createdPet = new Pet({
        ...input,
        owner: user,
      });

      await this.petRepository.save(createdPet);

      if (!createdPet) {
        throw new Error();
      }
      response.message = 'Pet created successfully';
    } catch (e) {
      response.message = 'Error creating pet';
    }
    return response;
  }

  // async update(id: string, input: CreatePetInput): Promise<Pet> {
  //
  // }

  async uploadAvatar(userId: string, id: string, avatar: string) {
    try {
      const pet = await this.petRepository.findOne({
        where: {
          _id: id,
          owner: {
            _id: userId,
          },
        },
        relations: {
          owner: true,
        },
      });

      if (!pet) throw new Error('Pet not found');

      delete pet.owner;

      await this.petRepository.save({
        ...pet,
        avatar: avatar,
      });

      return {
        success: true,
        message: 'Avatar uploaded successfully',
      } as ServerResponse;
    } catch (e) {
      return {
        success: false,
        message: e,
      } as ServerResponse;
    }
  }
}
