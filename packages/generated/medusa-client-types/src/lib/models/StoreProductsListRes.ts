/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { PricedProduct } from './PricedProduct';
import type { PricedVariant } from './PricedVariant';
import type { ProductOption } from './ProductOption';
import type { ProductVariant } from './ProductVariant';

export interface StoreProductsListRes {
  products: Array<Omit<SetRequired<PricedProduct,
  "variants" | "options" | "images" | "tags" | "collection" | "type">
  , "variants" | "options">& {
    variants: Array<SetRequired<PricedVariant, "prices" | "options">>
    options: Array<SetRequired<ProductOption, "values">>
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


