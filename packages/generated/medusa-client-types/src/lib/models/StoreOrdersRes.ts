/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { Discount } from './Discount';
import type { Fulfillment } from './Fulfillment';
import type { LineItem } from './LineItem';
import type { Order } from './Order';

export interface StoreOrdersRes {
  order: Omit<SetRequired<Order,
  "customer" | "discounts" | "fulfillments" | "items" | "payments" | "region" | "shipping_address" | "shipping_methods" | "discount_total" | "gift_card_tax_total" | "gift_card_total" | "paid_total" | "refundable_amount" | "refunded_total" | "shipping_total" | "subtotal" | "tax_total" | "total">
  , "discounts" | "fulfillments" | "items">& {
    discounts: Array<SetRequired<Discount, "rule">>
    fulfillments: Array<SetRequired<Fulfillment, "tracking_links">>
    items: Array<SetRequired<LineItem, "variant">>
  }
};


