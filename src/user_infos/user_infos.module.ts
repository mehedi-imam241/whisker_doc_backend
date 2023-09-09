import { Module } from '@nestjs/common';
import { UserInfosResolver } from './user_infos.resolver';
import { UserInfosService } from './user_infos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './models/user_infos.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  providers: [UserInfosResolver, UserInfosService],
})
export class UserInfosModule {}
