import { Module } from '@nestjs/common';
import { SymptomsService } from './symptoms.service';
import { SymptomsResolver } from './symptoms.resolver';
import { Symptoms } from './models/symptoms.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search_drug/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([Symptoms]), SearchModule],

  providers: [SymptomsService, SymptomsResolver],
})
export class SymptomsModule {}
