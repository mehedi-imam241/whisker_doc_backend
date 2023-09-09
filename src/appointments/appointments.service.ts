import { Injectable } from '@nestjs/common';
import { Appointment } from './models/appointment.model';
import { BookAppointmentInput } from './dtos/bookAppointment.input';
import { ServerResponse } from '../shared/operation.response';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateAllAppointmentSlotsInput } from './dtos/create_slot.input';
import { Appointment_Slot } from './models/appointment_slot.model';
import { Updated_Appointment_Slot } from './models/updated_appointment_slot';
import { ArrayOfNumbersResponse } from '../shared/ArrayOfNumbers.response';
import { ContactObject } from './dtos/contact.model';
import { VetInfo } from 'src/vet_infos/models/vet_info.model';
import { Prescription } from 'src/prescription/models/prescription.model';
import { Review } from 'src/review/models/review.model';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Appointment_Slot)
    private appointmentSlotRepository: Repository<Appointment_Slot>,
    @InjectRepository(Updated_Appointment_Slot)
    private updatedAppointmentSlotRepository: Repository<Updated_Appointment_Slot>,

    @InjectRepository(VetInfo)
    private vetInfoRepository: Repository<VetInfo>,

    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findAllOfVet(user: any): Promise<Appointment[]> {
    if (user.role === 'VET') {
      const res = await this.appointmentRepository.find({
        where: {
          vetId: user.userId,
        },
      });
      return res;
    }
    return [];
  }

  async findAllOfVetToday(type: string, user: any): Promise<Appointment[]> {
    if (user.role === 'VET') {
      const today = new Date();
      const startOfToday = new Date(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        0,
        0,
        0,
      );
      const endOfToday = new Date(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        23,
        59,
        59,
      );

      console.log(Between(startOfToday, endOfToday));

      // Find all appointments where the date is today and the vetId is the vetId of the user
      const res = await this.appointmentRepository.find({
        where: {
          vetId: user.userId,
          date: Between(startOfToday, endOfToday),
          type,
        },
        relations: {
          pet: true,
          owner: true,
        },
      });
      return res;
    }
    return [];
  }

  async findUpcomingsOfUser(userId: string): Promise<Appointment[]> {
    const today = new Date();
    const startOfToday = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
    );

    return await this.appointmentRepository.find({
      where: {
        ownerId: userId,
        date: MoreThanOrEqual(startOfToday),
      },
      relations: {
        pet: true,
        vet: true,
      },
    });
  }

  async findPreviousOfUser(userId: string): Promise<Appointment[]> {
    const today = new Date();
    const startOfToday = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
    );

    return await this.appointmentRepository.find({
      where: {
        ownerId: userId,
        date: LessThan(startOfToday),
      },
      relations: {
        pet: true,
        vet: true,
      },
    });
  }

  async findDetailsOfAppointment(apptId: string): Promise<Appointment> {
    const res = await this.appointmentRepository.findOne({
      where: {
        _id: apptId,
      },
      relations: {
        pet: true,
        vet: true,
      },
    });

    if (res.type === 'ONLINE') {
      const contactInfo = await this.vetInfoRepository.findOne({
        where: {
          vetId: res.vetId,
        },
        select: {
          zoomLink: true,
        },
      });

      if (!contactInfo) return res;

      res.zoomLink = contactInfo.zoomLink;
    }

    const prescriptionResponse = await this.prescriptionRepository.findOne({
      where: {
        appointmentId: apptId,
      },
    });

    const today = new Date();

    const startOfToday = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
    );

    if (res.date < startOfToday) {
      const review = await this.reviewRepository.findOne({
        where: {
          appointmentId: apptId,
        },
      });

      if (review) {
        res.review = review;
      }
    }

    if (prescriptionResponse) {
      res.prescription = prescriptionResponse;
    }

    return res;
  }

  async findById(appointmentId: string): Promise<Appointment> {
    const res = await this.appointmentRepository.findOne({
      where: {
        _id: appointmentId,
      },
      relations: {
        pet: true,
        owner: true,
        vet: true,
      },
    });

    const prescriptionResponse = await this.prescriptionRepository.findOne({
      where: {
        appointmentId,
      },
    });

    if (prescriptionResponse) {
      res.prescription = prescriptionResponse;
    }

    return res;
  }

  async findAllPreviousOfPet(petId: string): Promise<Appointment[]> {
    const today = new Date();
    const startOfToday = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
    );

    return await this.appointmentRepository.find({
      where: {
        petId,
        date: LessThan(startOfToday),
      },
      relations: {
        vet: true,
      },
    });
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

  async bookAppointment(
    bookAppointmentInput: BookAppointmentInput,
    user: any,
  ): Promise<ServerResponse> {
    const response = new ServerResponse();
    response.message = 'Only users can create appointments.';

    if (user.role === 'USER') {
      try {
        // const newuser = await this.userService.findOne(user.userId);

        const newAppointment = new Appointment({
          ...bookAppointmentInput,
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

  // async approve(appointmentId: string, user: any): Promise<ServerResponse> {
  //   const response = new ServerResponse();
  //   response.message = 'Appointment approving failed.';
  //
  //   if (user.role === 'VET' || user.role === 'ADMIN') {
  //     try {
  //       await this.appointmentRepository.update(
  //         {
  //           _id: appointmentId,
  //         },
  //         {
  //           approved: true,
  //         },
  //       );
  //
  //       response.message = 'Appointment approved successfully.';
  //     } catch (e) {}
  //   }
  //
  //   return response;
  // }

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

  async createSlots(
    createSlotsInput: CreateAllAppointmentSlotsInput,
    vetId: string,
  ): Promise<ServerResponse> {
    const response = new ServerResponse();
    response.message = 'Slots creation failed.';

    try {
      const newSlots = new Appointment_Slot({
        slots: createSlotsInput,
        vetId,
      });

      await this.appointmentSlotRepository.save(newSlots);

      response.message = 'Slots created successfully.';
    } catch (e) {
      console.log('e', e);
    }

    return response;
  }

  async isSlotsCreated(vetId: string) {
    const count = await this.appointmentSlotRepository.count({
      where: {
        vetId,
      },
    });

    if (count > 0) {
      return { message: `1` } as ServerResponse;
    }
    return { message: `0` } as ServerResponse;
  }

  async getAllSlotsOfVet(vetId: string): Promise<Appointment_Slot> {
    return await this.appointmentSlotRepository.findOne({
      where: {
        vetId,
      },
    });
  }

  async updateSlot(
    input: CreateAllAppointmentSlotsInput,
    vetId: string,
  ): Promise<ServerResponse> {
    const response = new ServerResponse();
    response.message = 'Slots creation failed.';
    const today = new Date();
    try {
      const oldSlots = await this.updatedAppointmentSlotRepository.findOne({
        where: {
          vetId,
        },
      });

      const newSlots = new Updated_Appointment_Slot({
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 3,
          0,
          0,
          0,
        ),
        slots: input,
        vetId,
      });

      await this.updatedAppointmentSlotRepository.save({
        ...oldSlots,
        ...newSlots,
      });
      response.message = 'Slots created successfully.';
    } catch (e) {
      console.log('e', e);
    }

    return response;
  }

  async assignUpdateSlotsToAppointmentSlots() {
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

    const updatedAppointmentSlots =
      await this.updatedAppointmentSlotRepository.find({
        where: {
          date: Between(startOfToday, endOfToday),
        },
      });

    console.log('updatedAppointmentSlots', updatedAppointmentSlots);

    for (const appointmentSlot of updatedAppointmentSlots) {
      const property = await this.appointmentSlotRepository.findOne({
        where: {
          vetId: appointmentSlot.vetId,
        },
      });

      if (!property) {
        continue;
      }
      console.log('property', property);

      const updatedSlots = await this.appointmentSlotRepository.save({
        ...property,
        slots: appointmentSlot.slots,
      });

      await this.updatedAppointmentSlotRepository.delete({
        _id: appointmentSlot._id,
      });

      console.log('updatedSlots', updatedSlots);
    }
  }

  async findSlotsThatAreNotBooked(date: Date, vetId: string) {
    const startOfToday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
    );
    const endOfToday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
    );

    const updatedAppointmentSlots = await this.appointmentRepository.find({
      where: {
        date: Between(startOfToday, endOfToday),
        vetId,
      },
      select: {
        slot_id: true,
      },
    });

    const slotsOfVets2 = await this.updatedAppointmentSlotRepository.findOne({
      where: {
        vetId,
        date: LessThanOrEqual(startOfToday),
      },
    });

    if (slotsOfVets2) {
      const AllowableSlotsOfVet = slotsOfVets2.slots.slots.map(
        (slot) => slot.idx,
      );
      const slots = updatedAppointmentSlots.map((slot) => slot.slot_id);
      const result = findElementsNotInArray(AllowableSlotsOfVet, slots);
      console.log(result); // Output: [1, 2, 5]

      return { ids: result } as ArrayOfNumbersResponse;
    }

    const slotsOfVets = await this.appointmentSlotRepository.findOne({
      where: {
        vetId,
      },
    });

    // console.log('slotsOfVets', slotsOfVets.slots.slots);

    if (!slotsOfVets) {
      return { ids: [] } as ArrayOfNumbersResponse;
    }

    const AllowableSlotsOfVet = slotsOfVets.slots.slots.map((slot) => slot.idx);
    const slots = updatedAppointmentSlots.map((slot) => slot.slot_id);
    const result = findElementsNotInArray(AllowableSlotsOfVet, slots);
    console.log(result); // Output: [1, 2, 5]

    return { ids: result } as ArrayOfNumbersResponse;

    // const result = getValuesNotInArrayInRange(slots, 0, 12);
    // console.log(result);
  }

  //   async getZoomLinkOfVet(vetId: string) {
  //     return await this.vetInfoRepository.findOne({
  //       where: {
  //         vetId,
  //       },
  //     });
  //   }

  //   async updateZoomLinkOfVet(vetId: string, zoomLink: string) {
  //     const contact = await this.contactRepository.findOne({
  //       where: {
  //         vetId,
  //       },
  //     });

  //     if (!contact) {
  //       await this.contactRepository.save({
  //         vetId,
  //         zoomLink,
  //       });
  //       return { message: 'Zoom Link added' } as ServerResponse;
  //     }

  //     await this.contactRepository.save({
  //       ...contact,
  //       zoomLink,
  //     });

  //     return { message: 'Zoom link updated successfully' } as ServerResponse;
  //   }
}

function findElementsNotInArray(array1, array2) {
  // Filter out elements from array1 that are not present in array2
  return array1.filter((element) => !array2.includes(element));
}
