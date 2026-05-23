import type { Product } from "./product";

export type AddToCartPayload = {
  product: string;
  quantity: number;
};

export type CartItem = {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
};

export type Cart = {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: string[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CartResponse = {
  message: string;
  numOfCartItems: number;
  cart: Cart;
};

export type CartErrorResponse = {
  error: string;
};

export type CartProduct = Product;
