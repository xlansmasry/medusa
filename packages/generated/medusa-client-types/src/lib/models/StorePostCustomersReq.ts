/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRequired } from '../core/ModelUtils';

export interface StorePostCustomersReq {
  /**
   * The Customer's first name.
   */
  first_name: string;  /**
   * The Customer's last name.
   */
  last_name: string;  /**
   * The email of the customer.
   */
  email: string;  /**
   * The Customer's password.
   */
  password: string;  /**
   * The Customer's phone number.
   */
  phone?: string;};


