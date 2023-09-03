import { Module } from '@nestjs/common';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './models/appointment.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment_Slot } from './models/appointment_slot.model';
import { Updated_Appointment_Slot } from './models/updated_appointment_slot';
import { VetInfo } from 'src/vet_infos/models/vet_info.model';
import { Prescription } from 'src/prescription/models/prescription.model';
import { Review } from 'src/review/models/review.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Appointment_Slot,
      Updated_Appointment_Slot,
      VetInfo,
      Prescription,
      Review,
    ]),
  ],
  providers: [AppointmentsResolver, AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
