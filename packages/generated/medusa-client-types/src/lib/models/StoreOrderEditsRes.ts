/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { LineItem } from './LineItem';
import type { OrderEdit } from './OrderEdit';
import type { OrderItemChange } from './OrderItemChange';

export interface StoreOrderEditsRes {
  order_edit: Omit<SetRequired<OrderEdit,
  "changes" | "items" | "payment_collection" | "shipping_total" | "discount_total" | "tax_total" | "total" | "subtotal" | "gift_card_total" | "gift_card_tax_total" | "difference_due">
  , "changes" | "items">& {
    changes: Array<SetRequired<OrderItemChange, "line_item" | "original_line_item">>
    items: Array<SetRequired<LineItem, "adjustments" | "tax_lines" | "variant">>
  }
};


