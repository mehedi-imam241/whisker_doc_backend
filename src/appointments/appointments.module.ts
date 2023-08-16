import { Module } from '@nestjs/common';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './models/appointment.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment_Slot } from './models/appointment_slot.model';
import { Updated_Appointment_Slot } from './models/updated_appointment_slot';
import { ContactModel } from './models/contact.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Appointment_Slot,
      Updated_Appointment_Slot,
      ContactModel,
    ]),
  ],
  providers: [AppointmentsResolver, AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
