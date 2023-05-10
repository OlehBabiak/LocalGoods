import { TestBed } from '@angular/core/testing';

import { OrdersConfirmService } from './orders-confirm.service';

describe('OrdersConfirmService', () => {
  let service: OrdersConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
