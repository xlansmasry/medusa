/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { Customer } from './Customer';

export interface StoreCustomersRes {
  customer: SetRequired<Customer,
  "shipping_addresses" | "billing_address">
};


