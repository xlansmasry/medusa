/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminPostCustomerGroupsGroupCustomersBatchReq {
  /**
   * The ids of the customers to add
   */
  customer_ids: Array<{
    /**
     * ID of the customer
     */
    id: string;
  }>;};


