/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { UseQueryOptionsWrapper, UseMutationOptionsWrapper} from '../core/HookUtils';
import { useMedusaStore } from '../useMedusaStore';
import type { StoreGetProductCategoriesCategoryRes } from '@medusajs/medusa-client-types';
import type { StoreGetProductCategoriesParams } from '@medusajs/medusa-client-types';
import type { StoreGetProductCategoryParams } from '@medusajs/medusa-client-types';
import type { StoreProductCategoriesListRes } from '@medusajs/medusa-client-types';

const { client } = useMedusaStore()

export const useProductCategoriesList = (
  queryParams: StoreGetProductCategoriesParams,
  options: UseQueryOptionsWrapper<Awaited<ReturnType<typeof client.productCategories.list>>> = {}
) => {
  const { data, ...rest } = useQuery<Awaited<ReturnType<typeof client.productCategories.list>>>(
    ['productCategories', 'list', queryParams],
    () => client.productCategories.list(queryParams),
    options
  );
  return { ...data, ...rest } as const
};

export const useProductCategoriesRetrieve = (
  id: string,
  queryParams: StoreGetProductCategoryParams,
  options: UseQueryOptionsWrapper<Awaited<ReturnType<typeof client.productCategories.retrieve>>> = {}
) => {
  const { data, ...rest } = useQuery<Awaited<ReturnType<typeof client.productCategories.retrieve>>>(
    ['productCategories', 'retrieve', id,queryParams],
    () => client.productCategories.retrieve(id,queryParams),
    options
  );
  return { ...data, ...rest } as const
};


