import { defaultStoreCartFields, defaultStoreCartRelations } from "."

import { CartService } from "../../../../services"
import { EntityManager } from "typeorm"
import { IsInt } from "class-validator"
import { MedusaError } from "medusa-core-utils"
import { decorateLineItemsWithTotals } from "./decorate-line-items-with-totals"
import { validator } from "../../../../utils/validator"

/**
 * @oas [post] /carts/{id}/line-items/{line_id}
 * operationId: PostCartsCartLineItemsItem
 * summary: Update a Line Item
 * description: "Updates a Line Item if the desired quantity can be fulfilled."
 * parameters:
 *   - (path) id=* {string} The id of the Cart.
 *   - (path) line_id=* {string} The id of the Line Item.
 *   - (body) quantity=* {integer} The quantity to set the Line Item to.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       medusa.carts.lineItems.update(cart_id, line_id, {
 *         quantity: 1
 *       })
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request POST 'https://medusa-url.com/store/carts/{id}/line-items/{line_id}' \
 *       --header 'Content-Type: application/json' \
 *       --data-raw '{
 *           "quantity": 1
 *       }'
 * tags:
 *   - Cart
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             cart:
 *               $ref: "#/components/schemas/cart"
 */
export default async (req, res) => {
  const { id, line_id } = req.params

  const validated = await validator(
    StorePostCartsCartLineItemsItemReq,
    req.body
  )

  const manager: EntityManager = req.scope.resolve("manager")
  const cartService: CartService = req.scope.resolve("cartService")

  await manager.transaction(async (m) => {
    // If the quantity is 0 that is effectively deletion
    if (validated.quantity === 0) {
      await cartService.withTransaction(m).removeLineItem(id, line_id)
    } else {
      const cart = await cartService.withTransaction(m).retrieve(id, { relations: ["items"] })

      const existing = cart.items.find((i) => i.id === line_id)
      if (!existing) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Could not find the line item"
        )
      }

      const lineItemUpdate = {
        variant_id: existing.variant.id,
        region_id: cart.region_id,
        quantity: validated.quantity,
        metadata: existing.metadata || {},
      }

      await cartService
        .withTransaction(m)
        .updateLineItem(id, line_id, lineItemUpdate)
    }

    // If the cart has payment sessions update these
    const updated = await cartService.withTransaction(m).retrieve(id, {
      relations: ["payment_sessions"],
    })

    if (updated.payment_sessions?.length) {
      await cartService.withTransaction(m).setPaymentSessions(id)
    }
  })

  const cart = await cartService.retrieve(id, {
    select: defaultStoreCartFields,
    relations: defaultStoreCartRelations,
  })
  const data = await decorateLineItemsWithTotals(cart, req)

  res.status(200).json({ cart: data })
}

export class StorePostCartsCartLineItemsItemReq {
  @IsInt()
  quantity: number
}
