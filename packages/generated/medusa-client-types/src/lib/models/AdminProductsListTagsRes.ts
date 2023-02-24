/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface AdminProductsListTagsRes {
  tags: Array<{
    /**
     * The ID of the tag.
     */
    id: string;
    /**
     * The number of products that use this tag.
     */
    usage_count: string;
    /**
     * The value of the tag.
     */
    value: string;
  }>;};


