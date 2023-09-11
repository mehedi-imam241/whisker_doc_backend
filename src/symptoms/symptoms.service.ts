import { SearchService } from './../search_drug/search.service';
import { TagsInput } from './dtos/Tags.input';
import { Injectable } from '@nestjs/common';
import { ServerResponse } from '../shared/operation.response';
import { CreateSymptomsInput } from './dtos/CreateSymptoms.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Symptoms } from './models/symptoms.model';
import {
  ArrayContainedBy,
  ArrayOverlap,
  ILike,
  IsNull,
  Not,
  Repository,
} from 'typeorm';
import { SearchSymptomsInput } from './dtos/SearchSymptoms.input';

@Injectable()
export class SymptomsService {
  constructor(
    @InjectRepository(Symptoms)
    private symptomsRepository: Repository<Symptoms>,

    private readonly searchService: SearchService,
  ) {}

  async createSymptoms(symptoms: CreateSymptomsInput, vetId: string) {
    const newSymptoms = new Symptoms({
      ...symptoms,
      vetId,
    });

    console.log(newSymptoms);

    const res = await this.symptomsRepository.save(newSymptoms);

    console.log(res);

    return { message: 'Symptoms created successfully' } as ServerResponse;
  }

  async verifySymptoms(symptomsId: number, vetId: string) {
    const symptom = await this.symptomsRepository.findOne({
      where: {
        _id: symptomsId,
      },
    });

    if (!symptom) {
      return {
        message: 'Symptoms not found',
        success: false,
      } as ServerResponse;
    }

    if (vetId !== symptom.vetId) {
      await this.symptomsRepository.save({
        ...symptom,
        verifiedById: vetId,
      });
    } else {
      return {
        success: false,
        message: 'You are not authorized to verify this symptoms',
      } as ServerResponse;
    }

    return {
      success: true,
      message: 'Symptoms verified successfully',
    } as ServerResponse;
  }

  async getVerfiedSymptoms(limit: number, skip: number) {
    return await this.symptomsRepository.find({
      where: {
        verifiedById: Not(IsNull()),
      },
      relations: {
        vet: true,
        verifiedBy: true
      },
      take: limit,
      skip,
    });
  }

  async getUnverfiedSymptoms(limit: number, skip: number) {
    return await this.symptomsRepository.find({
      where: {
        verifiedById: IsNull(),
      },
      relations: {
        vet: true,
      },
      take: limit,
      skip,
    });
  }

  async getSymptomsById(symptomsId: number) {
    return await this.symptomsRepository.findOne({
      where: {
        _id: symptomsId,
      },
      relations: {
        vet: true,
      },
    });
  }

  async searchSymptoms(input: SearchSymptomsInput) {
    return await this.symptomsRepository.find({
      where: {
        tags: ArrayOverlap(input.tags),
        species: ILike('%' + input.species + '%'),
      },
    });
  }
  async searchSymptomsTags(input: string) {
    return await this.searchService.searchSymptomsTag(input);
  }
}
