import { EntityManager } from "typeorm"
import UserService from "../../../../services/user"

/**
 * @oas [delete] /users/{id}
 * operationId: "DeleteUsersUser"
 * summary: "Delete a User"
 * description: "Deletes a User"
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the User.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.users.delete(user_id)
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request DELETE 'https://medusa-url.com/admin/users/{id}' \
 *       --header 'Authorization: Bearer {api_token}'
 * tags:
 *   - Users
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the deleted user.
 *             object:
 *               type: string
 *               description: The type of the object that was deleted.
 *               default: user
 *             deleted:
 *               type: boolean
 *               description: Whether or not the items were deleted.
 *               default: true
 */
export default async (req, res) => {
  const { user_id } = req.params

  const userService: UserService = req.scope.resolve("userService")
  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await userService.withTransaction(transactionManager).delete(user_id)
  })

  res.status(200).send({
    id: user_id,
    object: "user",
    deleted: true,
  })
}
