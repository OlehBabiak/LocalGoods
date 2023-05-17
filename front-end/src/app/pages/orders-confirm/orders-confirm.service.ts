import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, ResponseData } from '../../core';
import {
  API_PATH_SELLER,
  ORDER_CONFIRM_PATH,
} from '../../shared/constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersConfirmService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<ResponseData<Order[]>> {
    return this.http
      .get<ResponseData<Order[]>>(`/${API_PATH_SELLER}/${ORDER_CONFIRM_PATH}`)
      .pipe();
  }

  declineOrder(id: number): Observable<ResponseData<Order[]>> {
    return this.http.get<ResponseData<Order[]>>(
      `/${API_PATH_SELLER}/decline/${id}`
    );
  }

  deliverOrder(id: number): Observable<ResponseData<Order[]>> {
    return this.http.get<ResponseData<Order[]>>(
      `/${API_PATH_SELLER}/deliver/${id}`
    );
  }
}
