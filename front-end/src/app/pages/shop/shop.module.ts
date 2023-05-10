import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SubMenuHeaderComponent } from './components/sub-menu-header/sub-menu-header.component';
import { ShopService } from './shop.service';

@NgModule({
  declarations: [ShopComponent, ProductDetailComponent, SubMenuHeaderComponent],
  imports: [SharedModule, CommonModule, ShopRoutingModule],
  providers: [ShopService],
})
export class ShopModule {}
