import { Injectable } from '@nestjs/common';
import { VetInfo } from './models/vet_info.model';
import { VetInfoInput } from './dtos/vet_info.input';
import { ServerResponse } from '../shared/operation.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { LocationInput } from './dtos/location.input';
import { SortByInput } from './dtos/sort_by.input';

@Injectable()
export class VetInfoService {
  constructor(
    @InjectRepository(VetInfo)
    private VetInfoRepository: Repository<VetInfo>,
  ) { }

  // async createVerificationRequest(input: VetInfoInput, user: any) {
  //   const response = new ServerResponse();
  //   try {
  //     if (user.role !== 'VET') {
  //       throw new Error('You are not a vet');
  //     }
  //     const newVerificationRequest = new VetInfo({
  //       ...input,
  //       vetId: user.userId,
  //     });
  //     await this.VetInfoRepository.save(newVerificationRequest);
  //     if (!newVerificationRequest) {
  //       throw new Error('Error creating verification request');
  //     }
  //
  //     response.message = 'Verification request created successfully';
  //   } catch (e) {
  //     console.log(e);
  //     response.message = e.message;
  //   }
  //
  //   return response;
  // }

  // async getVerificationRequestsAdmin(limit: number, skip: number, user: any) {
  //   return await this.VetInfoRepository.find({
  //     where: {
  //       verified: false,
  //     },
  //     take: limit,
  //     skip: skip,
  //   });
  // }

  // async verifyVet(verificationId: string, user: any) {
  //   const response = new ServerResponse();
  //   try {
  //     const verificationRequest = await this.VetInfoRepository.update(
  //       {
  //         _id: verificationId,
  //       },
  //       {
  //         verified: true,
  //       },
  //     );
  //     if (!verificationRequest) {
  //       throw new Error('Error verifying vet');
  //     }
  //     response.message = 'Vet verified successfully';
  //   } catch (e) {
  //     response.message = e.message;
  //   }
  //
  //   return response;
  // }

  // async getVerificationStatus(vetId: any) {
  //   const response = new ServerResponse();
  //   try {
  //     const verificationRequest =
  //       await this.VetInfoRepository.findOneBy({
  //         vetId: vetId,
  //       });
  //     if (!verificationRequest) {
  //       throw new Error('No verification request found');
  //     }
  //     response.message = verificationRequest.verified
  //       ? 'Verified'
  //       : 'Not verified';
  //   } catch (e) {
  //     response.message = e.message;
  //   }
  //
  //   return response;
  // }

  async updateVetInfo(input: VetInfoInput, vetId: string) {
    const verification = await this.VetInfoRepository.findOneBy({
      vetId: vetId,
    });
    if (!verification) {
      const request = new VetInfo({
        ...input,
        vetId: vetId,
      });
      await this.VetInfoRepository.save(request);
      return { message: 'Information added successfully' } as ServerResponse;
    }

    await this.VetInfoRepository.save({
      ...verification,
      ...input,
    });
    return { message: 'Information updated successfully' } as ServerResponse;
  }

  async getVetInfo(vetId: string) {
    return await this.VetInfoRepository.findOneBy({
      vetId: vetId,
    });
  }

  async getVetsByLocation(location: LocationInput, keep: number, skip: number, sort_by: SortByInput): Promise<VetInfo[]> {
    const allVetInfos = await this.VetInfoRepository.find({
      relations: {
        vet: true,
      }
    });
    let locationSearchString = `http://router.project-osrm.org/table/v1/driving/${location.lng},${location.lat}`;

    allVetInfos.forEach((vetInfo) => {
      locationSearchString += `;${vetInfo.location.lng},${vetInfo.location.lat}`;
    });

    locationSearchString += '?sources=0&destinations=';

    for (let i = 1; i < allVetInfos.length + 1; i++) {
      if (i > 1)
        locationSearchString += ';';
      locationSearchString += `${i}`;
    }

    locationSearchString += '&annotations=distance,duration';

    const res = await axios.get(locationSearchString);

    // console.log(res.data);
    allVetInfos.forEach((vetInfo) => {
      vetInfo.duration = res.data.durations[0][allVetInfos.indexOf(vetInfo)];
      vetInfo.distance = res.data.distances[0][allVetInfos.indexOf(vetInfo)];
    });


    if (sort_by.sortBy === 'DISTANCE') {
      allVetInfos.sort((a, b) => a.distance - b.distance);
    }
    else
      allVetInfos.sort((a, b) => a.duration - b.duration);

    return allVetInfos.slice(skip, skip + keep);
  }
}
