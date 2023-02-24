/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { PricedVariant } from './PricedVariant';
import type { Product } from './Product';

export type PricedProduct = (Product & {
  variants?: Array<PricedVariant>;
});

