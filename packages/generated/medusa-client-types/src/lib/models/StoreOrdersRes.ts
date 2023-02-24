/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { Discount } from './Discount';
import type { Fulfillment } from './Fulfillment';
import type { LineItem } from './LineItem';
import type { Order } from './Order';

export interface StoreOrdersRes {
  order: SetRequired<Order,
  "shipping_address" | "fulfillments" | "items" | "shipping_methods" | "discounts" | "customer" | "payments" | "region">
  & {
    fulfillments: Array<SetRequired<Fulfillment, "tracking_links">>
    items: Array<SetRequired<LineItem, "variant">>
    discounts: Array<SetRequired<Discount, "rule">>
  }
};


