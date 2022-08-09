import {
  FulfillmentService,
  OrderService,
  SwapService,
} from "../../../../services"
import { defaultAdminOrdersFields, defaultAdminOrdersRelations } from "."

import { EntityManager } from "typeorm"
import { MedusaError } from "medusa-core-utils"

/**
 * @oas [post] /orders/{id}/swaps/{swap_id}/fulfillments/{fulfillment_id}/cancel
 * operationId: "PostOrdersSwapFulfillmentsCancel"
 * summary: "Cancels a fulfilmment related to a Swap"
 * description: "Registers a Fulfillment as canceled."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Order which the Swap relates to.
 *   - (path) swap_id=* {string} The ID of the Swap which the Fulfillment relates to.
 *   - (path) fulfillment_id=* {string} The ID of the Fulfillment.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.orders.cancelSwapFulfillment(order_id, swap_id, fulfillment_id)
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request POST 'https://medusa-url.com/admin/orders/{id}/swaps/{swap_id}/fulfillments/{fulfillment_id}/cancel' \
 *       --header 'Authorization: Bearer {api_token}'
 * tags:
 *   - Fulfillment
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             order:
 *               $ref: "#/components/schemas/order"
 */
export default async (req, res) => {
  const { id, swap_id, fulfillment_id } = req.params

  const swapService: SwapService = req.scope.resolve("swapService")
  const orderService: OrderService = req.scope.resolve("orderService")
  const fulfillmentService: FulfillmentService =
    req.scope.resolve("fulfillmentService")

  const fulfillment = await fulfillmentService.retrieve(fulfillment_id)

  if (fulfillment.swap_id !== swap_id) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `no fulfillment was found with the id: ${fulfillment_id} related to swap: ${id}`
    )
  }

  const swap = await swapService.retrieve(swap_id)

  if (swap.order_id !== id) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `no swap was found with the id: ${swap_id} related to order: ${id}`
    )
  }

  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await swapService
      .withTransaction(transactionManager)
      .cancelFulfillment(fulfillment_id)
  })

  const order = await orderService.retrieve(id, {
    select: defaultAdminOrdersFields,
    relations: defaultAdminOrdersRelations,
  })

  res.json({ order })
}
