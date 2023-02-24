/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { PaymentCollection } from './PaymentCollection';

export interface StorePaymentCollectionsRes {
  payment_collection: SetRequired<PaymentCollection,
  "region" | "payment_sessions">
};


