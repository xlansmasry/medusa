/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { ProductCategory } from './ProductCategory';

export interface StoreGetProductCategoriesCategoryRes {
  product_category: SetRequired<ProductCategory,
  "parent_category" | "category_children">
};


