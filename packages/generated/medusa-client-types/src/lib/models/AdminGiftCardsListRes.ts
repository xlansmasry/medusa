/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

import type { GiftCard } from './GiftCard';

export interface AdminGiftCardsListRes {
  gift_cards: Array<GiftCard>;  /**
   * The total number of items available
   */
  count: number;  /**
   * The number of items skipped before these items
   */
  offset: number;  /**
   * The number of items per page
   */
  limit: number;};


