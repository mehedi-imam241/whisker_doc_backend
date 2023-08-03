import { Injectable } from '@nestjs/common';
import { VetVerification } from './models/vet_verification.model';
import { VerificationRequestInput } from './dtos/VerificationRequest.intput';
import { ServerResponse } from '../shared/operation.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VetVerificationService {
  constructor(
    @InjectRepository(VetVerification)
    private vetVerificationRepository: Repository<VetVerification>,
  ) {}

  async createVerificationRequest(input: VerificationRequestInput, user: any) {
    const response = new ServerResponse();
    try {
      if (user.role !== 'VET') {
        throw new Error('You are not a vet');
      }
      const newVerificationRequest = new VetVerification({
        ...input,
        vetId: user.userId,
      });
      await this.vetVerificationRepository.save(newVerificationRequest);
      if (!newVerificationRequest) {
        throw new Error('Error creating verification request');
      }

      response.message = 'Verification request created successfully';
    } catch (e) {
      console.log(e);
      response.message = e.message;
    }

    return response;
  }

  async getVerificationRequestsAdmin(limit: number, skip: number, user: any) {
    return await this.vetVerificationRepository.find({
      where: {
        verified: false,
      },
      take: limit,
      skip: skip,
    });
  }

  async verifyVet(verificationId: string, user: any) {
    const response = new ServerResponse();
    try {
      const verificationRequest = await this.vetVerificationRepository.update(
        {
          _id: verificationId,
        },
        {
          verified: true,
        },
      );
      if (!verificationRequest) {
        throw new Error('Error verifying vet');
      }
      response.message = 'Vet verified successfully';
    } catch (e) {
      response.message = e.message;
    }

    return response;
  }

  async getVerificationStatus(vetId: any) {
    const response = new ServerResponse();
    try {
      const verificationRequest =
        await this.vetVerificationRepository.findOneBy({
          vetId: vetId,
        });
      if (!verificationRequest) {
        throw new Error('No verification request found');
      }
      response.message = verificationRequest.verified
        ? 'Verified'
        : 'Not verified';
    } catch (e) {
      response.message = e.message;
    }

    return response;
  }
}
