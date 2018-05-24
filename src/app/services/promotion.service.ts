import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    // Simulate server latency with 2 second day
    return new Promise(resolve => {
        setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id: number): Promise<Promotion> {
    // Simulate server latency with 2 second day
    return new Promise(resolve => {
        setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    // Simulate server latency with 2 second day
    return new Promise(resolve => {
        setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });
  }
}
