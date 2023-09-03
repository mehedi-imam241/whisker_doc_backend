import { Module } from '@nestjs/common';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { Review } from './models/review.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VetInfo } from 'src/vet_infos/models/vet_info.model';

@Module({
  imports: [TypeOrmModule.forFeature([Review, VetInfo])],

  providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
