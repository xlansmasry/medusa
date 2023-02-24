/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { Cart } from './Cart';
import type { Discount } from './Discount';
import type { LineItem } from './LineItem';
import type { Region } from './Region';
import type { ShippingMethod } from './ShippingMethod';

export interface StoreCartsRes {
  cart: SetRequired<Cart,
  "billing_address" | "discounts" | "gift_cards" | "items" | "payment" | "payment_sessions" | "region" | "shipping_address" | "shipping_methods">
  & {
    discounts: Array<SetRequired<Discount, "rule">>
    items: Array<SetRequired<LineItem, "adjustments" | "variant">>
    region: SetRequired<Region, "countries" | "payment_providers">
    shipping_methods: Array<SetRequired<ShippingMethod, "shipping_option">>
  }
};


