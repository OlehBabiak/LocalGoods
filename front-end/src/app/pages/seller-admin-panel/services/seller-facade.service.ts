import { Injectable } from '@angular/core';
import { IProduct } from '../../../core';
import { SellerProductItem } from '../../../core/interfaces/responseDatas/SellerProductResponseData';
import { SellerProductItemModel } from '../models/seller-product-item.model';

@Injectable()
export class SellerFacadeService {
  transformProductArrResponse(data: IProduct[]) {
    const newProductArr: SellerProductItem[] = [];
    data.forEach((product: IProduct) => {
      const productEl = new SellerProductItemModel(
        product.productTitle,
        product.imageLink,
        product.productCategory.productCategoryName,
        product.price,
        product.shortDescription,
        product.longDescription,
        product.id
      );
      newProductArr.push(productEl);
    });
    return newProductArr;
  }

  transformProductResponse(data: IProduct) {
    return new SellerProductItemModel(
      data.productTitle,
      data.imageLink,
      data.productCategory.productCategoryName,
      data.price,
      data.shortDescription,
      data.longDescription,
      data.id
    );
  }
}
