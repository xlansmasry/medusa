/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminGetVariantsVariantInventoryRes {
  /**
   * the id of the variant
   */
  id?: string;  /**
   * the stock location address ID
   */
  inventory?: string;  /**
   * An optional key-value map with additional details
   */
  sales_channel_availability?: {
    /**
     * Sales channel name
     */
    channel_name?: string;
    /**
     * Sales channel id
     */
    channel_id?: string;
    /**
     * Available quantity in sales channel
     */
    available_quantity?: number;
  };};


