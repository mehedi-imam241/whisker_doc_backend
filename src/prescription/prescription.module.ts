import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionResolver } from './prescription.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Prescription, PrescriptionSchema } from './models/prescription.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Prescription.name, schema: PrescriptionSchema },
    ]),
  ],
  providers: [PrescriptionService, PrescriptionResolver],
})
export class PrescriptionModule {}
