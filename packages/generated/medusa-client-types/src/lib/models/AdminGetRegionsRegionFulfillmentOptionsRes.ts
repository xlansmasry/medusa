/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminGetRegionsRegionFulfillmentOptionsRes {
  fulfillment_options: Array<{
    /**
     * ID of the fulfillment provider
     */
    provider_id: string;
    /**
     * fulfillment provider options
     */
    options: Array<Record<string, any>>;
  }>;};


