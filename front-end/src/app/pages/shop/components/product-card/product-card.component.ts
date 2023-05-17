import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from '../../../../shared/utils/decorators';
import { AddToCartResponseData, CartItem, IProduct } from '../../../../core';

@AutoUnsubscribe('addToCartSubs')
@AutoUnsubscribe('decreaseQuantitySubs')
@AutoUnsubscribe('removeItemSubs')
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
  private removeItemSubs = new Subscription();

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
      this.removeItemSubs.add(
        this.cartService.removeItem(this.cartItem.id).subscribe()
      );
    }
  }
}
