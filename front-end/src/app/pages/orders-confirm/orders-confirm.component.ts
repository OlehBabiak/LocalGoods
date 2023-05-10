import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../shared/dialogs/message-dialog/message-dialog.component';
import { Order } from '../../core';
import { OrdersConfirmService } from './orders-confirm.service';

@Component({
  selector: 'app-orders-confirm',
  templateUrl: './orders-confirm.component.html',
  styleUrls: ['./orders-confirm.component.scss'],
})
export class OrdersConfirmComponent implements OnInit {
  pending_orders!: Order[] | undefined;

  constructor(
    public orderConfirmService: OrdersConfirmService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  declineOrder(id: number) {
    this.orderConfirmService.declineOrder(id).subscribe((result) => {
      this.getOrders();
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: result.message,
      });
      dialogRef.afterClosed();
    });
  }

  deliverOrder(id: number) {
    this.orderConfirmService.deliverOrder(id).subscribe((result) => {
      this.getOrders();
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: result.message,
      });
      dialogRef.afterClosed();
    });
  }

  private getOrders() {
    this.orderConfirmService.getOrders().subscribe(({ data }) => {
      this.pending_orders = data;
    });
  }
}
