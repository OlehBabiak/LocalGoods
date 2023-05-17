import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromSellerProductList from '../../../store';
import { Store } from '@ngrx/store';
import { SellerProductState } from '../../../store/seller-product.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as ProductActions from '../../../store/seller-product.actions';
import { CreateSellerProductDialogComponent } from './dialogs/create-seller-product-dialog/create-seller-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/error-handling/error-dialog/error-dialog.component';
import { SellerProductItem } from '../../../core/interfaces/responseDatas/SellerProductResponseData';
import { AutoUnsubscribe } from '../../../shared/utils/decorators';
import { SellerService } from '../services/seller.service';

@AutoUnsubscribe('storeSubs')
@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.scss'],
})
export class SellerProductListComponent implements OnInit {
  products!: SellerProductItem[];
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'shortDesc',
    'price',
    'photo',
    'actions',
  ];
  dataSource!: MatTableDataSource<SellerProductItem>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private storeSubs = new Subscription();

  constructor(
    public store: Store<fromSellerProductList.AppState>,
    public sellerService: SellerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sellerService.getProducts().subscribe({
      next: (res: SellerProductItem[]) => {
        this.sellerService.setProducts(res);
      },
      error: (err) => {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: err,
          panelClass: 'color',
        });
        dialogRef.afterClosed();
      },
    });

    this.storeSubs.add(
      this.store
        .select('sellerProductData')
        .subscribe((state: SellerProductState) => {
          this.products = state.sellerProducts;
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onProductDelete(id: number) {
    console.log('ura');
    this.sellerService.deleteProduct(id.toString()).subscribe({
      next: (res: SellerProductItem[]) => {
        this.sellerService.setProducts(res);
      },
      error: (err) => {
        const dialogRef = this.dialog.open(ErrorDialogComponent, { data: err });
        dialogRef.afterClosed();
      },
    });
  }

  onProductUpdate(product: SellerProductItem) {
    this.store.dispatch(new ProductActions.ChangeMode(false));
    const dialogRef = this.dialog.open(CreateSellerProductDialogComponent, {
      data: product,
    });
    dialogRef.afterClosed();
  }
}
