/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminDeleteProductCategoriesCategoryProductsBatchReq {
  /**
   * The IDs of the products to delete from the Product Category.
   */
  product_ids: Array<{
    /**
     * The ID of a product
     */
    id: string;
  }>;};


