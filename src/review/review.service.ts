import { Injectable } from '@nestjs/common';
import { Review } from './models/review.model';
import { ServerResponse } from '../shared/operation.response';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateReviewInput } from './dtos/create_review.input';
import { VetInfo } from 'src/vet_infos/models/vet_info.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(VetInfo)
    private vetInfoRepository: Repository<VetInfo>,
  ) {}

  async createReview(review: CreateReviewInput, userId: string) {
    try {
      const createdReview = new Review({
        ...review,
        userId: userId,
      });

      await this.reviewRepository.save(createdReview);

      const vetInfo = await this.vetInfoRepository.findOne({
        where: {
          vetId: review.vetId,
        },
      });

      await this.vetInfoRepository.save({
        ...vetInfo,
        sumRating: createdReview.rating + vetInfo.sumRating,
        ratingCount: vetInfo.ratingCount + 1,
      });

      return {
        success: true,
        message: 'Review created successfully',
      } as ServerResponse;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Review creation failed',
      } as ServerResponse;
    }
  }

  async findReviewsByVetId(vetId: string) {
    const res = await this.reviewRepository.find({
      where: {
        vetId: vetId,
      },
      relations: {
        user: true,
      },
    });
    return res;
  }

  async findReviewByAppointmentId(apptId: string) {
    return await this.reviewRepository.findOne({
      where: {
        appointmentId: apptId,
      },
    });
  }
}
