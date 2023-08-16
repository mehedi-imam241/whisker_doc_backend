import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './models/appointment.model';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { ServerResponse } from '../shared/operation.response';
import { BookAppointmentInput } from './dtos/bookAppointment.input';
import {
  CreateAllAppointmentSlotsInput,
  CreateAppointmentSlotInput,
} from './dtos/create_slot.input';
import { Appointment_Slot } from './models/appointment_slot.model';
import { ArrayOfNumbersResponse } from '../shared/ArrayOfNumbers.response';
import { ContactModel } from './models/contact.model';

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
  async bookAppointment(
    @Args('input') input: BookAppointmentInput,
    @Context() ctx,
  ): Promise<ServerResponse> {
    return await this.appointmentsService.bookAppointment(input, ctx.req.user);
  }

  // @Mutation(() => ServerResponse)
  // @UseGuards(JwtAuthGuard)
  // async approveAppointment(
  //   @Args('appointmentId') appointmentId: string,
  //   @Context() ctx,
  // ): Promise<ServerResponse> {
  //   return await this.appointmentsService.approve(appointmentId, ctx.req.user);
  // }

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

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async CreateSlots(
    @Args('input') input: CreateAllAppointmentSlotsInput,
    @Context() ctx,
  ) {
    console.log(input);
    return await this.appointmentsService.createSlots(
      input,
      ctx.req.user.userId,
    );
  }

  @Query(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async IsSlotCreated(@Context() ctx) {
    return await this.appointmentsService.isSlotsCreated(ctx.req.user.userId);
  }

  @Query(() => Appointment_Slot, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getAppointmentSlotsOfVet(@Context() ctx) {
    return await this.appointmentsService.getAllSlotsOfVet(ctx.req.user.userId);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async updateAppointmentSlot(
    @Args('input') input: CreateAllAppointmentSlotsInput,
    @Context() ctx,
  ) {
    return await this.appointmentsService.updateSlot(
      input,
      ctx.req.user.userId,
    );
  }

  @Query(() => ArrayOfNumbersResponse, { nullable: true })
  async FindSlotsThatAreNotBooked(
    @Args('date') date: Date,
    @Args('vetId') vetId: string,
  ): Promise<ArrayOfNumbersResponse> {
    return await this.appointmentsService.findSlotsThatAreNotBooked(
      date,
      vetId,
    );
  }

  @Query(() => [Appointment], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getAppointmentSlotsOfMe(@Context() ctx) {
    return await this.appointmentsService.findAllOfUser(ctx.req.user.userId);
  }

  @Query(() => Appointment, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getAppointmentDetails(@Args('apptId') apptId: string) {
    return await this.appointmentsService.findDetailsOfAppointment(apptId);
  }

  @Query(() => ContactModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getZoomLink(@Context() ctx) {
    return await this.appointmentsService.getZoomLinkOfVet(ctx.req.user.userId);
  }

  @Mutation(() => ServerResponse)
  @UseGuards(JwtAuthGuard)
  async updateZoomLink(@Args('link') link: string, @Context() ctx) {
    return await this.appointmentsService.updateZoomLinkOfVet(
      ctx.req.user.userId,
      link,
    );
  }
}
