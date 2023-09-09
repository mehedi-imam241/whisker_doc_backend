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

  async createPaymentMethod() {
    return await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2030,
        cvc: '123',
      },
    });
  }

  async addPaymentMethodToCustomer(customerId: string) {
    return await this.stripe.paymentMethods.attach(
      'pm_1NUUonCEAeaWr2ZssIeqBwk0',
      {
        customer: 'cus_OH39FkumO7WxjO',
      },
    );
  }

  async retrieveCustomer(customerId: string) {
    return await this.stripe.customers.retrieve('cus_OH39FkumO7WxjO');
  }
  async getAllPaymentItems() {
    return await this.stripe.products.list({
      active: true,
      limit: 10,
    });

    // return await this.stripe.prices.list({
    //   active: true,
    //   limit: 10,
    // });
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

  async pauseSubscription(subscriptionId: string) {
    return await this.stripe.subscriptions.update(
      'sub_1NUV46CEAeaWr2ZsEVSN62uK',
      {
        pause_collection: {
          behavior: 'void',
        },
      },
    );
  }

  async resumeSubscription(subscriptionId: string) {
    return await this.stripe.subscriptions.resume(
      'sub_1NUV46CEAeaWr2ZsEVSN62uK',
    );
  }
}
