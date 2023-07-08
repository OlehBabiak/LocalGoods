import { shopReducer, ShopState } from './shop.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './user.reducer';
import { cartReducer } from './cart.reducer';
import {
  sellerProductReducer,
  SellerProductState,
} from './seller-product.reducer';
import { CartData } from '../core';

export interface AppState {
  sortData: ShopState;
  userData: UserState;
  sellerProductData: SellerProductState;
  cartData: CartData;
}

export const reducers: ActionReducerMap<AppState, any> = {
  sortData: shopReducer,
  userData: userReducer,
  sellerProductData: sellerProductReducer,
  cartData: cartReducer,
};
