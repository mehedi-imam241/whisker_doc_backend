import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ChatModule } from './chat/chat.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PetsModule } from './pets/pets.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SearchModule } from './search_drug/search.module';
import * as process from 'process';
import { VetInfoModule } from './vet_infos/vet_info.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ReviewModule } from './review/review.module';
import { ReviewVetsModule } from './review_vets/review_vets.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { HomeServiceModule } from './home_service/home_service.module';
import { SymptomsModule } from './symptoms/symptoms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/models/pet.model';
import { User } from './user/models/user.model';
import { Appointment } from './appointments/models/appointment.model';
import { Blog } from './blog/models/blog.model';
import { VetInfo } from './vet_infos/models/vet_info.model';
import { HomeService } from './home_service/models/home_service.model';
import { Slots } from './home_service/models/slots.model';
import { Date_schedule } from './home_service/models/date_schedule.model';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { Appointment_Slot } from './appointments/models/appointment_slot.model';
import { Updated_Appointment_Slot } from './appointments/models/updated_appointment_slot';
import { ContactObject } from './appointments/dtos/contact.model';
import { Prescription } from './prescription/models/prescription.model';
import { Review } from './review/models/review.model';
import { UserInfosModule } from './user_infos/user_infos.module';
import { UserInfo } from './user_infos/models/user_infos.model';
import { Symptoms } from './symptoms/models/symptoms.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [
        User,
        Pet,
        Appointment,
        Blog,
        UserInfo,
        VetInfo,
        HomeService,
        Date_schedule,
        Slots,
        Appointment_Slot,
        Updated_Appointment_Slot,
        ContactObject,
        Prescription,
        Review,
        Symptoms,
      ],
    }),

    ScheduleModule.forRoot(),
    UserModule,
    // ChatModule,
    BlogModule,
    AuthModule,
    PetsModule,
    AppointmentsModule,
    SearchModule,
    VetInfoModule,
    SubscriptionModule,
    ReviewModule,
    // ReviewVetsModule,
    PrescriptionModule,
    // HomeServiceModule,
    SymptomsModule,
    SchedulerModule,
    UserInfosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
