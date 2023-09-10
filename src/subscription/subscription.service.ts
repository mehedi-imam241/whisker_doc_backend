import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerResponse } from 'src/shared/operation.response';
import { UserInfo } from 'src/user_infos/models/user_infos.model';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { SubscriptionCreateObject } from './dtos/subscription.output';

@Injectable()
export class SubscriptionService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createCustomer(user: any) {
    try {
      const existingCustomer = await this.userInfoRepository.findOne({
        where: {
          userId: user._id,
        },
      });

      if (!existingCustomer) {
        const res = await this.stripe.customers.create({
          email: user.email,
          name: user._id,
        });

        const userInfo = new UserInfo({
          userId: user._id,
          stripeId: res.id,
        });

        await this.userInfoRepository.save(userInfo);
        return {
          success: true,
          message: res.id,
        } as ServerResponse;
      }
      return {
        success: true,
        message: existingCustomer.stripeId,
      } as ServerResponse;
    } catch (error) {
      console.log(error);
      return {
        success: false,
      } as ServerResponse;
    }
  }

  async createSubscription(userId: string, priceId: string) {
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if (!userInfo) {
      throw new Error('User not found');
    }

    const customerId = userInfo.stripeId;

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    } as SubscriptionCreateObject;
  }

  async getAllProducts() {
    const res = await this.stripe.products.list({
      active: true,
      limit: 100,
    });

    const res1 = await this.stripe.prices.list({
      active: true,
      limit: 100,
    });

    // attach price unit amount to each product
    for (let i = 0; i < res.data.length; i++) {
      const product = res.data[i];
      const price = res1.data.find((price) => price.product === product.id);
      product['My_Price'] = price.unit_amount / 100;
    }

    console.log(res.data);

    return res.data;
  }

  async checkSubscriptionStatus(userId: string) {
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if (!userInfo) {
      throw new Error('User not found');
    }

    const customerId = userInfo.stripeId;

    const res = await this.stripe.subscriptions.list({
      customer: customerId,
    });

    // attach product info to each subscription
    for (let i = 0; i < res.data.length; i++) {
      const subscription = res.data[i];
      const product = await this.stripe.products.retrieve(
        subscription['plan'].product as string,
      );
      subscription['plan'].product = product;
    }

    return res.data;
  }

  async checkIfSubscriptionActive(userId: string) {
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if (!userInfo) {
      throw new Error('User not found');
    }

    const customerId = userInfo.stripeId;

    const res = await this.stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    if (res.data.length > 0) {
      return { success: true } as ServerResponse;
    }
    return {
      success: false,
      message: 'Subscription inactive',
    } as ServerResponse;
  }

  // async getAllCustomers() {
  //   (await this.stripe.customers.list({ limit: 100 })).data.map(
  //     async (customer) => {
  //       if (customer.name === undefined || customer.name === null) return;
  //       await this.userInfoRepository.save({
  //         userId: customer.name,
  //         stripeId: customer.id,
  //       });
  //     },
  //   );
  // }

  // async addPaymentMethodToCustomer(customerId: string) {
  //   return await this.stripe.paymentMethods.attach(
  //     'pm_1NUUonCEAeaWr2ZssIeqBwk0',
  //     {
  //       customer: 'cus_OH39FkumO7WxjO',
  //     },
  //   );
  // }

  // async createPaymentIntent(customerId: string) {
  //   return await this.stripe.paymentIntents.create({
  //     amount: 2000,
  //     currency: 'usd',
  //     customer: 'cus_OH39FkumO7WxjO',
  //   });
  // }

  // async retrieveCustomer(customerId: string) {
  //   return await this.stripe.customers.retrieve('cus_OH39FkumO7WxjO');
  // }

  // async retrieveSubscription(subscriptionId: string) {
  //   return await this.stripe.subscriptions.retrieve(
  //     'sub_1NUV46CEAeaWr2ZsEVSN62uK',
  //   );
  // }

  async cancelSubscription(subscriptionId: string) {
    await this.stripe.subscriptions.del(subscriptionId);
    return {
      message: 'Subscription cancelled successfully',
      success: true,
    } as ServerResponse;
  }
}
