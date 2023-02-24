/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { Region } from './Region';

export interface StoreRegionsListRes {
  regions: Array<SetRequired<Region,
  "countries" | "payment_providers" | "fulfillment_providers">
  >
};


