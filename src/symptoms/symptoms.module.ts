import { Module } from '@nestjs/common';
import { SymptomsService } from './symptoms.service';
import { SymptomsResolver } from './symptoms.resolver';
import { Symptoms, SymptomsSchema } from './models/symptoms.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Symptoms.name, schema: SymptomsSchema },
    ]),
  ],

  providers: [SymptomsService, SymptomsResolver],
})
export class SymptomsModule {}
