import { Injectable } from '@nestjs/common';
import { HomeService } from './models/home_service.model';
import { ServerResponse } from '../shared/operation.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slots } from './models/slots.model';
import { Date_schedule } from './models/date_schedule.model';

@Injectable()
export class HomeServiceService {
  constructor(
    @InjectRepository(HomeService)
    private homeServiceRepository: Repository<HomeService>,
    @InjectRepository(Date_schedule)
    private dateScheduleRepository: Repository<Date_schedule>,
    @InjectRepository(Slots)
    private slotsRepository: Repository<Slots>,
  ) {}

  async JoinHomeService(vetId: string) {
    const newHomeService = new HomeService({
      vetId,
    });
    await this.homeServiceRepository.save(newHomeService);

    return { message: 'Join Home Service Success' } as ServerResponse;
  }

  async getHomeServiceVets(
    limit: number,
    skip: number,
  ): Promise<HomeService[]> {
    const uniqueVetsWithHomeService = await this.homeServiceRepository.find({
      relations: ['vet'],
      skip,
      take: limit,
    });
    console.log(uniqueVetsWithHomeService);

    return uniqueVetsWithHomeService;
  }

  async CreateSlots(dateScheduleId: string) {
    const slottimes = [
      {
        starts_at: '08:00',
        ends_at: '09:00',
      },
      {
        starts_at: '09:00',
        ends_at: '10:00',
      },
      {
        starts_at: '10:00',
        ends_at: '11:00',
      },
      {
        starts_at: '11:00',
        ends_at: '12:00',
      },
    ];

    const slots = slottimes.map((slottime) => {
      return new Slots({
        starts_at: slottime.starts_at,
        ends_at: slottime.ends_at,
        dateScheduleId,
      });
    });

    await this.slotsRepository.save(slots);
  }

  async createDateSchedule(date: Date) {
    const homeServices = await this.homeServiceRepository.find();

    const dateSchedule = new Date_schedule({
      date,
    });

    const dateSchedules = homeServices.map((homeService) => {
      dateSchedule.homeServiceId = homeService._id;
      return dateSchedule;
    });

    await this.dateScheduleRepository.save(dateSchedules);
  }

  async bookSlot(slotId: string, userId: string, dateScheduleId: string) {
    const slot = await this.slotsRepository.findOne({
      where: {
        _id: slotId,
        dateScheduleId,
      },
    });
    slot.occupiedByUser = userId;
    await this.slotsRepository.save(slot);
  }
}
