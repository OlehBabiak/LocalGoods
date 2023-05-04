import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartResponseData, CartItem, IProduct } from '../../../core';
import { AutoUnsubscribe } from '../../utils/decorators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@AutoUnsubscribe('addToCartSubs')
@AutoUnsubscribe('decreaseQuantitySubs')
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;
  cartItem!: CartItem;
  private addToCartSubs = new Subscription();
  private decreaseQuantitySubs = new Subscription();

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCart();
  }

  onProductAddToCart(prod: IProduct) {
    const product: AddToCartResponseData = {
      id: prod.id,
      quantity: +1,
    };
    this.addToCartSubs.add(this.cartService.addToCart(product).subscribe());
  }

  onDetailShow(id: number) {
    this.router.navigate([id.toString()], { relativeTo: this.route });
  }

  getCart() {
    this.cartService.cartContent.subscribe((cartArr: CartItem[]) => {
      cartArr.forEach((cart) => {
        if (cart.product.id === this.product.id) {
          this.cartItem = cart;
        }
      });
    });
  }

  setNewQuantity(product: IProduct, $event: string) {
    const newQuantity = +$event + this.cartItem.quantity;
    const newAmount = newQuantity * this.cartItem.product.price;
    this.cartService.changeQuantity(product.id, newQuantity, newAmount);
    const model: AddToCartResponseData = {
      id: product.id,
      quantity: +$event,
    };
    this.cartService.calcOrderData();
    if ($event === '+1') {
      this.addToCartSubs.add(this.cartService.addToCart(model).subscribe());
    } else {
      this.decreaseQuantitySubs.add(
        this.cartService.decreaseQuantity(product.id).subscribe()
      );
    }
  }
}
