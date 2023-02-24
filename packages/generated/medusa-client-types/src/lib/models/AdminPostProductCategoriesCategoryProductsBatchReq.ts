/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminPostProductCategoriesCategoryProductsBatchReq {
  /**
   * The IDs of the products to add to the Product Category
   */
  product_ids: Array<{
    /**
     * The ID of the product
     */
    id: string;
  }>;};


