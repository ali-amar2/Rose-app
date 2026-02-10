export type Cart = {
  user: string;
  cartItems: {
    product: Product;
    price: number;
    quantity: number;
    _id: string;
  }[];
  _id: string;
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
  price: number;
};

export type AddToCartItem = {
  product: string;
  quantity: number;
};
