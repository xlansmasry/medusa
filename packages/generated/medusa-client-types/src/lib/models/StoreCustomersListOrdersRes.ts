/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { Discount } from './Discount';
import type { Fulfillment } from './Fulfillment';
import type { LineItem } from './LineItem';
import type { Order } from './Order';

export interface StoreCustomersListOrdersRes {
  orders: Array<Omit<SetRequired<Order,
  "shipping_address" | "fulfillments" | "items" | "shipping_methods" | "discounts" | "customer" | "payments" | "region" | "discount_total" | "gift_card_tax_total" | "gift_card_total" | "paid_total" | "refundable_amount" | "refunded_total" | "shipping_total" | "subtotal" | "tax_total" | "total">
  , "fulfillments" | "items" | "discounts">& {
    fulfillments: Array<SetRequired<Fulfillment, "tracking_links">>
    items: Array<SetRequired<LineItem, "variant">>
    discounts: Array<SetRequired<Discount, "rule">>
  }>
  /**
   * The total number of items available
   */
  count: number;  /**
   * The number of items skipped before these items
   */
  offset: number;  /**
   * The number of items per page
   */
  limit: number;};


