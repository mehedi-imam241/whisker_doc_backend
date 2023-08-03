import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './models/review.model';
import { ServerResponse } from '../shared/operation.response';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private userModel: Model<Review>) {}

  async createReview(review: string, userId: string) {
    console.log('review', review);
    console.log('userId', userId);
    const createdReview = new this.userModel({
      review: review,
      userId: userId,
    });
    await createdReview.save();
    return {
      message: 'Review created successfully',
    } as ServerResponse;
  }

  async findAll(limit: number, skip: number): Promise<Review[]> {
    return await this.userModel.find().limit(limit).skip(skip).exec();
  }
}
