import { Module } from '@nestjs/common';
import { VetVerificationService } from './vet_verification.service';
import { VetVerificationResolver } from './vet_verification.resolver';
import { VetVerification } from './models/vet_verification.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VetVerification])],
  providers: [VetVerificationService, VetVerificationResolver],
})
export class VetVerificationModule {}
