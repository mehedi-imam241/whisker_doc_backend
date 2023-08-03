import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrescriptionService } from './prescription.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { CreatePrescription } from './dtos/prescription.dto';
import { Prescription } from './models/prescription.model';

@Resolver()
export class PrescriptionResolver {
  constructor(private prescriptionService: PrescriptionService) {}

  @Mutation(() => Prescription)
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

  @Query(() => [Prescription])
  @UseGuards(JwtAuthGuard)
  async getPrescriptionByPetId(
    @Args('limit') limit: number,
    @Args('skip') skip: number,
    @Args('petId') petId: string,
  ) {
    return this.prescriptionService.getPrescriptionByPetId(limit, skip, petId);
  }
}
