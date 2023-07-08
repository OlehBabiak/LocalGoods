import { Action } from '@ngrx/store';
import { IProduct } from '../core';

export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const ADD_TO_CART = 'ADD_TO_CART';

export class IncreaseQuantity implements Action {
  readonly type = CHANGE_QUANTITY;

  constructor(public payload: { product: IProduct; quantity: string }) {}
}

export type CartActions = IncreaseQuantity;
