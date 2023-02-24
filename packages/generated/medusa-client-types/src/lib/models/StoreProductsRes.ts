/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { PricedProduct } from './PricedProduct';
import type { PricedVariant } from './PricedVariant';
import type { ProductOption } from './ProductOption';
import type { ProductVariant } from './ProductVariant';

export interface StoreProductsRes {
  product: SetRequired<PricedProduct,
  "variants" | "options" | "images" | "tags" | "collection" | "type">
  & {
    variants: Array<SetRequired<PricedVariant, "prices" | "options">>
    options: Array<SetRequired<ProductOption, "values">>
  }
};


