import { Injectable } from '@nestjs/common';
import { Prescription } from './models/prescription.model';
import { CreatePrescription } from './dtos/prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreatePrescription2 } from './dtos/prescription2.dto';
import { ServerResponse } from 'src/shared/operation.response';

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


    try {
      const newPrescription = new Prescription({
        ...createPrescriptionDto,
        vetId: vetId,
      });
      // console.log(newPrescription);
      await this.PrescriptionRepository.save(newPrescription);

      return {message:"Prescription Created Successfully",success:true} as ServerResponse


    } catch (error) {
      return {message:"Prescription Creation Failed",success:false} as ServerResponse
    }


  }


  async createPrescription2(
    createPrescriptionDto: CreatePrescription2
  ) {
    const newPrescription = new Prescription({
      ...createPrescriptionDto,
    });
    return await this.PrescriptionRepository.save(newPrescription);
  }


  // async getPrescriptionByPetId(limit: number, skip: number, petId: string) {
  //   const today = new Date();
  //   const endOfToday = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     23,
  //     59,
  //     59,
  //   );

  //   return await this.PrescriptionRepository.find({
  //     where: {
  //       petId: petId,
  //       createdAt: LessThanOrEqual(endOfToday),
  //     },
  //     relations: {
  //       pet: true,
  //       vet: true,
  //     },
  //     take: limit,
  //     skip: skip,
  //   });
  // }
}
