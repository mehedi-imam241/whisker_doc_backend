import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { SearchModule } from '../search_drug/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SearchModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
