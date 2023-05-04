import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { AuthGuard } from '../../core';
import { USER_ROLES } from '../../shared/constants/constants';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[1],
    },
  },
  { path: ':id', component: ProductDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
