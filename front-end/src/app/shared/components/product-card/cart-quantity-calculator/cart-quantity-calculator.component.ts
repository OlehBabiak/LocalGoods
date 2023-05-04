import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-quantity-calculator',
  templateUrl: './cart-quantity-calculator.component.html',
  styleUrls: ['./cart-quantity-calculator.component.scss'],
})
export class CartQuantityCalculatorComponent {
  @Input() quantity!: string;

  @Output() newQuantity: EventEmitter<string> = new EventEmitter();

  onIncreaseQuantity() {
    let quantity = Number(this.quantity);
    --quantity;
    this.quantity = quantity.toString();
    this.newQuantity.emit('+1');
  }

  onDecreaseQuantity() {
    let quantity = Number(this.quantity);
    ++quantity;
    this.quantity = quantity.toString();
    this.newQuantity.emit('-1');
  }
}
