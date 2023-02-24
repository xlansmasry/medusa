/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { LineItem } from './LineItem';
import type { Return } from './Return';
import type { Swap } from './Swap';

export interface StoreSwapsRes {
  swap: SetRequired<Swap,
  "order" | "additional_items" | "return_order" | "fulfillments" | "payment" | "shipping_address" | "shipping_methods" | "cart">
  & {
    additional_items: Array<SetRequired<LineItem, "variant">>
    return_order: SetRequired<Return, "shipping_method">
  }
};


