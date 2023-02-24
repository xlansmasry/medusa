/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminPostSalesChannelsChannelProductsBatchReq {
  /**
   * The IDs of the products to add to the Sales Channel
   */
  product_ids: Array<{
    /**
     * The ID of the product
     */
    id: string;
  }>;};


