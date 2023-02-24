/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminPostOrdersOrderShippingMethodsReq {
  /**
   * The price (excluding VAT) that should be charged for the Shipping Method
   */
  price: number;  /**
   * The ID of the Shipping Option to create the Shipping Method from.
   */
  option_id: string;  /**
   * The data required for the Shipping Option to create a Shipping Method. This will depend on the Fulfillment Provider.
   */
  date?: Record<string, any>;};


