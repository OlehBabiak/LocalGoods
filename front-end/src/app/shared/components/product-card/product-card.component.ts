import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartResponseData, CartItem, IProduct } from '../../../core';
import { AutoUnsubscribe } from '../../utils/decorators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@AutoUnsubscribe('addToCartSubs')
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;
  quantity = '1';
  isThisProductInCart = false;
  private addToCartSubs = new Subscription();

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
      quantity: +this.quantity,
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
          this.isThisProductInCart = true;
        }
      });
    });
  }

  setNewQuantity(product: IProduct, $event: string) {
    this.quantity = $event;
  }
}
