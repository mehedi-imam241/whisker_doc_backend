import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prescription } from './models/prescription.model';
import { CreatePrescription } from './dtos/prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription.name)
    private prescriptionModel: Model<Prescription>,
  ) {}

  async createPrescription(
    createPrescriptionDto: CreatePrescription,
    vetId: string,
  ) {
    const newPrescription = new this.prescriptionModel({
      ...createPrescriptionDto,
      vetId: vetId,
    });
    return await newPrescription.save();
  }

  async getPrescriptionByPetId(limit: number, skip: number, petId: string) {
    return await this.prescriptionModel
      .find({ petId: petId })
      .limit(limit)
      .skip(skip)
      .exec();
  }
}
