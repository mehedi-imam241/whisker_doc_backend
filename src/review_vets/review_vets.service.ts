import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerResponse } from '../shared/operation.response';
import { ReviewVet } from './models/review.model';

@Injectable()
export class ReviewVetsService {
  constructor(
    @InjectModel(ReviewVet.name) private reviewVetModel: Model<ReviewVet>,
  ) {}

  async createReview(review: string, vetId: string, userId: string) {
    const createdReview = new this.reviewVetModel({
      review: review,
      vetId: vetId,
      userId: userId,
    });
    await createdReview.save();
    return {
      message: 'Vet Review created successfully',
    } as ServerResponse;
  }

  async findAll(
    limit: number,
    skip: number,
    vetId: string,
  ): Promise<ReviewVet[]> {
    return await this.reviewVetModel
      .find({ vetId: vetId })
      .limit(limit)
      .skip(skip)
      .exec();
  }
}
