/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminDeletePublishableApiKeySalesChannelsBatchReq {
  /**
   * The IDs of the sales channels to delete from the publishable api key
   */
  sales_channel_ids: Array<{
    /**
     * The ID of the sales channel
     */
    id: string;
  }>;};


