import { Injectable } from '@nestjs/common';
import { Appointment } from './models/appointment.model';
import { CreateAppointmentInput } from './dtos/createAppointment.input';
import { ServerResponse } from '../shared/operation.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async findAllOfVet(user: any): Promise<Appointment[]> {
    if (user.role === 'VET') {
      return await this.appointmentRepository.find({
        where: {
          vetId: user.userId,
        },
      });
    }
    return [];
  }

  async findAllOfVetToday(type: string, user: any): Promise<Appointment[]> {
    if (user.role === 'VET') {
      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
      );
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
      );

      // Find all appointments where the date is between the start and end of today
      return await this.appointmentRepository.find({
        where: {
          vetId: user.userId,
          date: Between(startOfToday, endOfToday),
          type,
        },
      });
    }
    return [];
  }

  async findOneOfPet(petId: string, user: any): Promise<any> {
    await this.appointmentRepository.findOneBy({ petId, ownerId: user.userId });
  }

  async deleteAppointmentOfVet(apptId: string, user: any) {
    if (user.role === 'VET') {
      return await this.appointmentRepository.delete({
        _id: apptId,
        vet: user.userId,
      });
    }
    return [];
  }

  async create(
    createAppointmentInput: CreateAppointmentInput,
    user: any,
  ): Promise<ServerResponse> {
    const response = new ServerResponse();
    response.message = 'Only users can create appointments.';

    if (user.role === 'USER') {
      try {
        // const newuser = await this.userService.findOne(user.userId);

        const newAppointment = new Appointment({
          ...createAppointmentInput,
          ownerId: user.userId,
        });

        await this.appointmentRepository.save(newAppointment);
        response.message = 'Appointment created successfully.';
      } catch (e) {
        console.log('e', e);
        response.message = 'Appointment creation failed.';
      }
    }

    return response;
  }

  async approve(appointmentId: string, user: any): Promise<ServerResponse> {
    const response = new ServerResponse();
    response.message = 'Appointment approving failed.';

    if (user.role === 'VET' || user.role === 'ADMIN') {
      try {
        await this.appointmentRepository.update(
          {
            _id: appointmentId,
          },
          {
            approved: true,
          },
        );

        response.message = 'Appointment approved successfully.';
      } catch (e) {}
    }

    return response;
  }

  async deleteAppointment(
    appointmentId: string,
    user: any,
  ): Promise<ServerResponse> {
    const response = new ServerResponse();
    response.message = 'Appointment deletion failed.';

    if (user.role === 'USER' || user.role === 'VET') {
      try {
        await this.appointmentRepository.delete({
          _id: appointmentId,
        });
        response.message = 'Appointment deleted successfully.';
      } catch (e) {}
    }

    return response;
  }
}
