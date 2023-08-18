import { Module } from '@nestjs/common';
import { VetInfoService } from './vet_info.service';
import { VetInfoResolver } from './vet_info.resolver';
import { VetInfo } from './models/vet_info.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VetInfo])],
  providers: [VetInfoService, VetInfoResolver],
})
export class VetInfoModule {}
