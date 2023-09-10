import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionResolver } from './subscription.resolver';
import { UserInfo } from 'src/user_infos/models/user_infos.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  providers: [SubscriptionService, SubscriptionResolver],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
