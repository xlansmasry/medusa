/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminDeleteCustomerGroupsGroupCustomerBatchReq {
  /**
   * The ids of the customers to remove
   */
  customer_ids: Array<{
    /**
     * ID of the customer
     */
    id: string;
  }>;};


