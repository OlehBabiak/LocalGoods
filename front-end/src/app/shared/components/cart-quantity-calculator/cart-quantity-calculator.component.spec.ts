import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartQuantityCalculatorComponent } from './cart-quantity-calculator.component';

describe('CartQuantityCalculatorComponent', () => {
  let component: CartQuantityCalculatorComponent;
  let fixture: ComponentFixture<CartQuantityCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartQuantityCalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartQuantityCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
