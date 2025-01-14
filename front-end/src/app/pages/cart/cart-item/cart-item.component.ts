import { Component, Input } from '@angular/core';
import { AddToCartResponseData, CartItem, IProduct } from '../../../core';
import { CartService } from '../../../services/cart.service';
import { AutoUnsubscribe } from '../../../shared/utils/decorators';
import { Subscription } from 'rxjs';

@AutoUnsubscribe('removeItemSubs')
@AutoUnsubscribe('addToCartSubs')
@AutoUnsubscribe('decreaseQuantitySubs')
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  private removeItemSubs = new Subscription();
  private addToCartSubs = new Subscription();
  private decreaseQuantitySubs = new Subscription();

  constructor(private cartService: CartService) {}

  removeItem(id: number) {
    this.cartService.removeItemFromCart(id);
    this.cartService.calcOrderData();
    this.removeItemSubs.add(this.cartService.removeItem(id).subscribe());
  }

  setNewQuantity(product: IProduct, $event: string) {
    console.log($event);
    const newQuantity = +$event;
    const newAmount = newQuantity * this.cartItem.product.price;
    this.cartService.changeQuantity(product.id, newQuantity, newAmount);
    const model: AddToCartResponseData = {
      id: product.id,
      quantity: +$event,
    };
    this.cartService.calcOrderData();
    if (+$event > 0) {
      this.addToCartSubs.add(this.cartService.addToCart(model).subscribe());
    } else {
      this.removeItem(this.cartItem.id);
    }
  }
}
