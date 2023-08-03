import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createCustomer(email: string, paymentMethodId: string) {
    return await this.stripe.customers.create({
      email: 'mehedi2@mehedi.com',
      payment_method: 'pm_1NUUonCEAeaWr2ZssIeqBwk0',
      invoice_settings: {
        default_payment_method: 'pm_1NUUonCEAeaWr2ZssIeqBwk0',
      },
    });
  }

  async createSubscription(customerId: string, priceId: string) {
    return await this.stripe.subscriptions.create({
      customer: 'cus_OH39FkumO7WxjO',
      items: [{ price: 'price_1NURZcCEAeaWr2Zs7II1hnxi' }],
    });
  }

  async retrieveSubscription(subscriptionId: string) {
    return await this.stripe.subscriptions.retrieve(
      'sub_1NUV46CEAeaWr2ZsEVSN62uK',
    );
  }

  async resumeSubscription(subscriptionId: string) {
    return await this.stripe.subscriptions.resume(
      'sub_1NUV46CEAeaWr2ZsEVSN62uK',
    );
  }
}
