import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Symptoms } from './models/symptoms.model';
import { Model } from 'mongoose';
import { ServerResponse } from '../shared/operation.response';
import { CreateSymptomsInput } from './dtos/CreateSymptoms.input';

@Injectable()
export class SymptomsService {
  constructor(
    @InjectModel(Symptoms.name) private symptomsModel: Model<Symptoms>,
  ) {}

  async searchSymptoms(searchTerm: string) {
    return await this.symptomsModel
      .find({ $text: { $search: searchTerm } })
      .exec();
  }

  async getVerfiedSymptoms(limit: number, skip: number) {
    return await this.symptomsModel
      .find({ verifiedBy: { $ne: null } })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async getUnverfiedSymptoms(limit: number, skip: number) {
    return await this.symptomsModel
      .find({ verifiedBy: null })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async verifySymptoms(symptomsId: string, vetId: string) {
    await this.symptomsModel
      .findByIdAndUpdate(symptomsId, { verifiedBy: vetId })
      .exec();

    return { message: 'Symptoms verified successfully' } as ServerResponse;
  }

  async createSymptoms(symptoms: CreateSymptomsInput, vetId: string) {
    const newSymptoms = new this.symptomsModel({ ...symptoms, vetId: vetId });
    await newSymptoms.save();
    return { message: 'Symptoms created successfully' } as ServerResponse;
  }
}
