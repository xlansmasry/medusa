import Memcached from "memcached"

import {
  ConfigurableModuleDeclaration,
  MODULE_RESOURCE_TYPE,
  ICacheService,
} from "@medusajs/medusa"
import { MedusaError } from "medusa-core-utils"

import { MemcachedCacheModuleOptions } from "../types"

const DEFAULT_CACHE_TIME = 30 // 30 seconds

type InjectedDependencies = {}

class MemcachedCacheService implements ICacheService {
  protected readonly memcached: Memcached

  protected TTL: number

  constructor(
    {}: InjectedDependencies,
    options: MemcachedCacheModuleOptions,
    moduleDeclaration?: ConfigurableModuleDeclaration
  ) {
    this.memcached = new Memcached(options.location, options.options)

    this.TTL = options.defaultTTL || DEFAULT_CACHE_TIME

    if (moduleDeclaration?.resources !== MODULE_RESOURCE_TYPE.SHARED) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "At the moment this module can only be used with shared resources"
      )
    }
  }
  /**
   * Set a key/value pair to the cache.
   * It is also possible to manage the ttl through environment variable using CACHE_TTL. If the ttl is 0 it will
   * act like the value should not be cached at all.
   * @param key
   * @param data
   * @param ttl
   */
  async set(
    key: string,
    data: Record<string, unknown>,
    ttl: number = this.TTL
  ): Promise<void> {
    return new Promise((res, rej) =>
      this.memcached.set(key, JSON.stringify(data), ttl, (err) => {
        if (err) {
          rej(err)
        } else {
          res()
        }
      })
    )
  }

  /**
   * Retrieve a cached value belonging to the given key.
   * @param cacheKey
   */
  async get<T>(cacheKey: string): Promise<T | null> {
    return new Promise((res, rej) => {
      this.memcached.get(cacheKey, function (err, data) {
        if (err) {
          res(null)
        } else {
          if (data) {
            res(JSON.parse(data))
          } else {
            res(null)
          }
        }
      })
    })
  }

  /**
   * Invalidate cache for a specific key. a key can be either a specific key or more global such as "ps:*".
   * @param key
   */
  async invalidate(key: string): Promise<void> {
    return new Promise((res, rej) => {
      this.memcached.touch(key, 0, function (err) {
        if (err) {
          rej(err)
        }
      })
    })
  }
}

export default MemcachedCacheService
