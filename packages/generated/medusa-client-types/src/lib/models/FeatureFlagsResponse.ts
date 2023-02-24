/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export type FeatureFlagsResponse = Array<{
  /**
   * The key of the feature flag.
   */
  key: string;
  /**
   * The value of the feature flag.
   */
  value: boolean;
}>;
