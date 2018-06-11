import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
      return  this.restangular.one('dishes',id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
        .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .pipe(
         map(
            dishes => {
               return dishes.map(dish => dish.id)
            }
         )
    );
  }
}
