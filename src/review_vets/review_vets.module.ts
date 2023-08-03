import { Module } from '@nestjs/common';
import { ReviewVetsResolver } from './review_vets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewVet, ReviewVetSchema } from './models/review.model';
import { ReviewVetsService } from './review_vets.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReviewVet.name, schema: ReviewVetSchema },
    ]),
  ],
  providers: [ReviewVetsResolver, ReviewVetsService],
})
export class ReviewVetsModule {}
