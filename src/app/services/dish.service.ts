import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private http: Http,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
                    .pipe(map(res => { return this.processHTTPMsgService.extractData(res); }));
    //return of(DISHES).pipe(delay(2000));
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/'+ id)
                    .pipe(map(res => { return this.processHTTPMsgService.extractData(res); }));
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .pipe(map(res => { return this.processHTTPMsgService.extractData(res)[0]; }));
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .pipe(map(dishes => { return dishes.map(dish => dish.id) }));
    //return of(DISHES.map(dish => dish.id ));
  }
}
