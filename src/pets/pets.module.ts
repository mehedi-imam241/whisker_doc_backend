import { Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';
import { Pet } from './models/pet.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    TypeOrmModule.forFeature([Pet]),
    UserModule,
  ],
  providers: [PetsResolver, PetsService],
})
export class PetsModule {}
