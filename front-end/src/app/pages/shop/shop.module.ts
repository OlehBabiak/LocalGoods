import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@NgModule({
  declarations: [ShopComponent, ProductDetailComponent],
  imports: [SharedModule, CommonModule, ShopRoutingModule],
})
export class ShopModule {}
