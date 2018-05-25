import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    // Simulate server latency with 2 second day
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: number): Observable<Promotion> {
    // Simulate server latency with 2 second day
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // Simulate server latency with 2 second day
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }
}
