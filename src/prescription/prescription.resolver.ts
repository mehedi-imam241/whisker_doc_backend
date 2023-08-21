import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrescriptionService } from './prescription.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { CreatePrescription } from './dtos/prescription.dto';
import { Prescription } from './models/prescription.model';
import { CreatePrescription2 } from './dtos/prescription2.dto';
import { ServerResponse } from 'src/shared/operation.response';


@Resolver()
export class PrescriptionResolver {
  constructor(private prescriptionService: PrescriptionService) {}

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createPrescription(
    @Args('input') input: CreatePrescription,
    @Context() ctx,
  ) {
    return this.prescriptionService.createPrescription(
      input,
      ctx.req.user.userId,
    );
  }

  @Mutation(() => Prescription)
  async createPrescription2(
    @Args('input') input: CreatePrescription2,
    @Context() ctx,  ) {
    return this.prescriptionService.createPrescription2(
      input

    );
  }



  // @Query(() => [Prescription])
  // @UseGuards(JwtAuthGuard)
  // async getPrescriptionByPetId(
  //   @Args('limit') limit: number,
  //   @Args('skip') skip: number,
  //   @Args('petId') petId: string,
  // ) {
  //   return this.prescriptionService.getPrescriptionByPetId(limit, skip, petId);
  // }
}
