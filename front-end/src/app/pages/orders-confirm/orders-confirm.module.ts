import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrdersConfirmComponent } from './orders-confirm.component';
import { OrdersConfirmService } from './orders-confirm.service';

@NgModule({
  declarations: [OrdersConfirmComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: OrdersConfirmComponent }]),
  ],
  providers: [OrdersConfirmService],
})
export class OrdersConfirmModule {}
