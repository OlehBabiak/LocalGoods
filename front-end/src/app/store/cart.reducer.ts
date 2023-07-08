import * as CartActon from './cart.actions';
import { CartData, CartItem } from '../core';

const initialState: CartData = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

export function cartReducer(
  state: CartData = initialState,
  { payload, type }: CartActon.CartActions
): CartData {
  switch (type) {
    case CartActon.CHANGE_QUANTITY: {
      const newQuantity: number = +payload.quantity;
      const newAmount: number = newQuantity * payload.product.price;
      const newCart: CartItem[] = state.cartItems;
      newCart.forEach((item: CartItem, index: number): void => {
        if (item.product.id === payload.product.id) {
          item.quantity = newQuantity;
          item.totalAmount = newAmount;
        }
        //delete item from cart array if quantity === 0
        if (item.quantity === 0) {
          newCart.splice(index, 1);
        }
      });
      const orderData: { amount: number; quantity: number } = newCart.reduce(
        (orderData: { amount: number; quantity: number }, item: CartItem) => {
          orderData.quantity += item.quantity;
          orderData.amount += item.quantity * item.product.price;
          return orderData;
        },
        { quantity: 0, amount: 0 }
      );
      return {
        ...state,
        cartItems: newCart,
        totalAmount: orderData.amount,
        totalQuantity: orderData.quantity,
      };
    }
    default:
      return state;
  }
}
