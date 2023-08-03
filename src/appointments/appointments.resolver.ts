import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './models/appointment.model';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { ServerResponse } from '../shared/operation.response';
import { CreateAppointmentInput } from './dtos/createAppointment.input';

@Resolver()
export class AppointmentsResolver {
  constructor(private appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment])
  @UseGuards(JwtAuthGuard)
  async getAllAppointmentsOfVet(@Context() ctx): Promise<Appointment[]> {
    return await this.appointmentsService.findAllOfVet(ctx.req.user);
  }

  @Query(() => [Appointment])
  @UseGuards(JwtAuthGuard)
  async getAllAppointmentsOfVetToday(
    @Args('type') type: string,
    @Context() ctx,
  ): Promise<Appointment[]> {
    return await this.appointmentsService.findAllOfVetToday(type, ctx.req.user);
  }

  @Query(() => Appointment)
  @UseGuards(JwtAuthGuard)
  async getAppointmentOfPet(
    @Args('petId') petId: string,
    @Context() ctx,
  ): Promise<any> {
    return await this.appointmentsService.findOneOfPet(petId, ctx.req.user);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async createAppointment(
    @Args('input') input: CreateAppointmentInput,
    @Context() ctx,
  ): Promise<ServerResponse> {
    return await this.appointmentsService.create(input, ctx.req.user);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async approveAppointment(
    @Args('appointmentId') appointmentId: string,
    @Context() ctx,
  ): Promise<ServerResponse> {
    return await this.appointmentsService.approve(appointmentId, ctx.req.user);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async cancelAppointment(
    @Args('appointmentId') appointmentId: string,
    @Context() ctx,
  ): Promise<ServerResponse> {
    return await this.appointmentsService.deleteAppointment(
      appointmentId,
      ctx.req.user,
    );
  }
}
