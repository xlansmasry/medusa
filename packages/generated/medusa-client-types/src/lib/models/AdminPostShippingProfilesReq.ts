/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminPostShippingProfilesReq {
  /**
   * The name of the Shipping Profile
   */
  name: string;  /**
   * The type of the Shipping Profile
   */
  type: 'default' | 'gift_card' | 'custom';};


