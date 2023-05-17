import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import {
  AddToCartResponseData,
  IProduct,
  ResponseData,
} from '../../../../core';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { AutoUnsubscribe } from '../../../../shared/utils/decorators';
import { ShopService } from '../../shop.service';

export interface Seller {
  key: string;
  value: string;
}

@AutoUnsubscribe('addToCartSubs')
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id!: string | null;
  $product!: Observable<IProduct>;
  product!: IProduct;
  quantity = '1';
  $dataSource: BehaviorSubject<Seller[]> = new BehaviorSubject<Seller[]>([]);
  private addToCartSubs = new Subscription();

  constructor(
    private shopService: ShopService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  onClickAdd(prod: IProduct) {
    const product: AddToCartResponseData = {
      id: prod.id,
      quantity: 1,
    };
    this.addToCartSubs.add(this.cartService.addToCart(product).subscribe());
  }

  onChangeQuantity($event: Event) {
    this.quantity = ($event.target as HTMLInputElement).value;
  }

  onGoBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private getProductDetails(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.$product = this.shopService.getProductDetails(this.id).pipe(
      map((resp: ResponseData<IProduct>) => {
        console.log(resp.data);
        return resp.data;
      }),
      tap((value: IProduct) => {
        this.$dataSource.next([
          { key: 'Country', value: value.seller.address.country },
          { key: 'City', value: value.seller.address.city },
          { key: 'Area', value: value.seller.address.area },
          { key: 'Email', value: value.seller.email },
          { key: 'Mobile', value: value.seller.mobile },
          { key: 'Name', value: value.seller.address.country },
        ]);
      })
    );
  }
}
