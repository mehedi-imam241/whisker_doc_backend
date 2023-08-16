import { Injectable } from '@nestjs/common';
import { Prescription } from './models/prescription.model';
import { CreatePrescription } from './dtos/prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private PrescriptionRepository: Repository<Prescription>,
  ) {}

  async createPrescription(
    createPrescriptionDto: CreatePrescription,
    vetId: string,
  ) {
    const newPrescription = new Prescription({
      ...createPrescriptionDto,
      vetId: vetId,
    });
    // console.log(newPrescription);
    return await this.PrescriptionRepository.save(newPrescription);
  }

  async getPrescriptionByPetId(limit: number, skip: number, petId: string) {
    const today = new Date();
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    );

    return await this.PrescriptionRepository.find({
      where: {
        petId: petId,
        createdAt: LessThanOrEqual(endOfToday),
      },
      relations: {
        pet: true,
        vet: true,
      },
      take: limit,
      skip: skip,
    });
  }
}
