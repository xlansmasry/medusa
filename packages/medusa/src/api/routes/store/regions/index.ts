import { Router } from "express"
import middlewares from "../../../middlewares"
import { Region } from "./../../../../"

const route = Router()

export default (app) => {
  app.use("/regions", route)

  route.get("/", middlewares.wrap(require("./list-regions").default))
  route.get("/:region_id", middlewares.wrap(require("./get-region").default))

  return app
}

/**
 * @schema StoreRegionsListRes
 * type: object
 * x-extended-relations:
 *   model: Region
 *   defaults:
 *     - countries
 *     - payment_providers
 *     - fulfillment_providers
 * required:
 *   - regions
 * properties:
 *   regions:
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Region"
 */
export type StoreRegionsListRes = {
  regions: Region[]
}

/**
 * @schema StoreRegionsRes
 * type: object
 * x-extended-relations:
 *   model: Region
 *   defaults:
 *     - countries
 *     - payment_providers
 *     - fulfillment_providers
 * required:
 *   - region
 * properties:
 *   region:
 *     $ref: "#/components/schemas/Region"
 */
export type StoreRegionsRes = {
  region: Region
}

export * from "./get-region"
export * from "./list-regions"
