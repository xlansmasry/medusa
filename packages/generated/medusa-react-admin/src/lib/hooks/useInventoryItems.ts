/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { UseQueryOptionsWrapper, UseMutationOptionsWrapper} from '../core/HookUtils';
import { useMedusaAdmin } from '../useMedusaAdmin';
import type { AdminGetInventoryItemsItemLocationLevelsParams } from '@medusajs/medusa-client-types';
import type { AdminGetInventoryItemsItemParams } from '@medusajs/medusa-client-types';
import type { AdminGetInventoryItemsParams } from '@medusajs/medusa-client-types';
import type { AdminInventoryItemsDeleteRes } from '@medusajs/medusa-client-types';
import type { AdminInventoryItemsListWithVariantsAndLocationLevelsRes } from '@medusajs/medusa-client-types';
import type { AdminInventoryItemsLocationLevelsRes } from '@medusajs/medusa-client-types';
import type { AdminInventoryItemsRes } from '@medusajs/medusa-client-types';
import type { AdminPostInventoryItemsInventoryItemReq } from '@medusajs/medusa-client-types';
import type { AdminPostInventoryItemsItemLocationLevelsLevelReq } from '@medusajs/medusa-client-types';
import type { AdminPostInventoryItemsItemLocationLevelsReq } from '@medusajs/medusa-client-types';

const { client } = useMedusaAdmin()

export const useInventoryItemsList = (
  queryParams: AdminGetInventoryItemsParams,
  options: UseQueryOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.list>>> = {}
) => {
  const { data, ...rest } = useQuery<Awaited<ReturnType<typeof client.inventoryItems.list>>>(
    ['inventoryItems', 'list', queryParams],
    () => client.inventoryItems.list(queryParams),
    options
  );
  return { ...data, ...rest } as const
};

export const useInventoryItemsRetrieve = (
  id: string,
  queryParams: AdminGetInventoryItemsItemParams,
  options: UseQueryOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.retrieve>>> = {}
) => {
  const { data, ...rest } = useQuery<Awaited<ReturnType<typeof client.inventoryItems.retrieve>>>(
    ['inventoryItems', 'retrieve', id,queryParams],
    () => client.inventoryItems.retrieve(id,queryParams),
    options
  );
  return { ...data, ...rest } as const
};

export const useInventoryItemsPostInventoryItemsInventoryItem = (
  id: string,
  requestBody: AdminPostInventoryItemsInventoryItemReq,
  queryParams: {
    /**
     * Comma separated list of relations to include in the results.
     */
    expand?: string,
    /**
     * Comma separated list of fields to include in the results.
     */
    fields?: string,
  },
  options: UseMutationOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.postInventoryItemsInventoryItem>>, unknown, AdminPostInventoryItemsInventoryItemReq> = {}
) => {
  if (!options?.onSuccess) {
    const queryClient = useQueryClient()
    options.onSuccess = async () => {
      await queryClient.invalidateQueries('inventoryItems')
    }
  }
  return useMutation<Awaited<ReturnType<typeof client.inventoryItems.postInventoryItemsInventoryItem>>, unknown, AdminPostInventoryItemsInventoryItemReq>(
    ['inventoryItems', 'postInventoryItemsInventoryItem', id,requestBody,queryParams],
    () => client.inventoryItems.postInventoryItemsInventoryItem(id,requestBody,queryParams),
    options
  );
};

export const useInventoryItemsDeleteInventoryItemsInventoryItem = (
  id: string,
  options: UseMutationOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.deleteInventoryItemsInventoryItem>>, unknown, void> = {}
) => {
  if (!options?.onSuccess) {
    const queryClient = useQueryClient()
    options.onSuccess = async () => {
      await queryClient.invalidateQueries('inventoryItems')
    }
  }
  return useMutation<Awaited<ReturnType<typeof client.inventoryItems.deleteInventoryItemsInventoryItem>>, unknown, void>(
    ['inventoryItems', 'deleteInventoryItemsInventoryItem', id],
    () => client.inventoryItems.deleteInventoryItemsInventoryItem(id),
    options
  );
};

export const useInventoryItemsListLocationLevels = (
  id: string,
  queryParams: AdminGetInventoryItemsItemLocationLevelsParams,
  options: UseQueryOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.listLocationLevels>>> = {}
) => {
  const { data, ...rest } = useQuery<Awaited<ReturnType<typeof client.inventoryItems.listLocationLevels>>>(
    ['inventoryItems', 'listLocationLevels', id,queryParams],
    () => client.inventoryItems.listLocationLevels(id,queryParams),
    options
  );
  return { ...data, ...rest } as const
};

export const useInventoryItemsPostInventoryItemsInventoryItemLocationLevels = (
  id: string,
  requestBody: AdminPostInventoryItemsItemLocationLevelsReq,
  queryParams: {
    /**
     * Comma separated list of relations to include in the results.
     */
    expand?: string,
    /**
     * Comma separated list of fields to include in the results.
     */
    fields?: string,
  },
  options: UseMutationOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.postInventoryItemsInventoryItemLocationLevels>>, unknown, AdminPostInventoryItemsItemLocationLevelsReq> = {}
) => {
  if (!options?.onSuccess) {
    const queryClient = useQueryClient()
    options.onSuccess = async () => {
      await queryClient.invalidateQueries('inventoryItems')
    }
  }
  return useMutation<Awaited<ReturnType<typeof client.inventoryItems.postInventoryItemsInventoryItemLocationLevels>>, unknown, AdminPostInventoryItemsItemLocationLevelsReq>(
    ['inventoryItems', 'postInventoryItemsInventoryItemLocationLevels', id,requestBody,queryParams],
    () => client.inventoryItems.postInventoryItemsInventoryItemLocationLevels(id,requestBody,queryParams),
    options
  );
};

export const useInventoryItemsPostInventoryItemsInventoryItemLocationLevelsLocationLevel = (
  id: string,
  locationId: string,
  requestBody: AdminPostInventoryItemsItemLocationLevelsLevelReq,
  queryParams: {
    /**
     * Comma separated list of relations to include in the results.
     */
    expand?: string,
    /**
     * Comma separated list of fields to include in the results.
     */
    fields?: string,
  },
  options: UseMutationOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.postInventoryItemsInventoryItemLocationLevelsLocationLevel>>, unknown, AdminPostInventoryItemsItemLocationLevelsLevelReq> = {}
) => {
  if (!options?.onSuccess) {
    const queryClient = useQueryClient()
    options.onSuccess = async () => {
      await queryClient.invalidateQueries('inventoryItems')
    }
  }
  return useMutation<Awaited<ReturnType<typeof client.inventoryItems.postInventoryItemsInventoryItemLocationLevelsLocationLevel>>, unknown, AdminPostInventoryItemsItemLocationLevelsLevelReq>(
    ['inventoryItems', 'postInventoryItemsInventoryItemLocationLevelsLocationLevel', id,locationId,requestBody,queryParams],
    () => client.inventoryItems.postInventoryItemsInventoryItemLocationLevelsLocationLevel(id,locationId,requestBody,queryParams),
    options
  );
};

export const useInventoryItemsDeleteInventoryItemsInventoryIteLocationLevelsLocation = (
  id: string,
  locationId: string,
  queryParams: {
    /**
     * Comma separated list of relations to include in the results.
     */
    expand?: string,
    /**
     * Comma separated list of fields to include in the results.
     */
    fields?: string,
  },
  options: UseMutationOptionsWrapper<Awaited<ReturnType<typeof client.inventoryItems.deleteInventoryItemsInventoryIteLocationLevelsLocation>>, unknown, void> = {}
) => {
  if (!options?.onSuccess) {
    const queryClient = useQueryClient()
    options.onSuccess = async () => {
      await queryClient.invalidateQueries('inventoryItems')
    }
  }
  return useMutation<Awaited<ReturnType<typeof client.inventoryItems.deleteInventoryItemsInventoryIteLocationLevelsLocation>>, unknown, void>(
    ['inventoryItems', 'deleteInventoryItemsInventoryIteLocationLevelsLocation', id,locationId,queryParams],
    () => client.inventoryItems.deleteInventoryItemsInventoryIteLocationLevelsLocation(id,locationId,queryParams),
    options
  );
};


