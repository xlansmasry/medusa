import type { Model } from "../../../client/interfaces/Model"
import { DeepRelation } from "../../../client/interfaces/Model"
import type { OpenApi } from "../interfaces/OpenApi"
import { getModel } from "./getModel"
import { reservedWords } from "./getOperationParameterName"
import { getType } from "./getType"
import { OperationParameter } from "../../../client/interfaces/OperationParameter"
import { OpenApiSchema } from "../interfaces/OpenApiSchema"
import { Dictionary } from "../../../utils/types"
import { OpenApiParameter } from "../interfaces/OpenApiParameter"
import { listOperations } from "./listOperations"

export const getModels = (openApi: OpenApi): Model[] => {
  const models: Model[] = []
  if (openApi.components) {
    for (const definitionName in openApi.components.schemas) {
      if (openApi.components.schemas.hasOwnProperty(definitionName)) {
        const definition = openApi.components.schemas[definitionName]
        const definitionType = getType(definitionName)
        const model = getModel(
          openApi,
          definition,
          true,
          definitionType.base.replace(reservedWords, "_$1")
        )
        // TODO REMOVE
        if (definition["x-extended-relations"]) {
          const defaults = definition["x-extended-relations"].defaults
          const splitRelations = defaults.map((relation) => relation.split("."))
          const level1 = [
            ...new Set(splitRelations.map((relation) => relation[0])),
          ]

          const level2: Record<string, DeepRelation> = {}
          const deepRelations = splitRelations.filter(
            (relation) => relation.length == 2
          )
          for (const deepRelation of deepRelations) {
            if (!Object.keys(level2).includes(deepRelation[0])) {
              level2[deepRelation[0]] = {
                name: deepRelation[0],
                properties: [],
              }
            }
            level2[deepRelation[0]].properties.push(deepRelation[1])
          }

          const relationModel = definition["x-extended-relations"].model
          for (const prop of model.properties) {
            if (prop.type === relationModel) {
              prop.extensions = {
                relations: level1,
                deepRelations: Object.values(level2),
              }
            }
          }
        }

        models.push(model)
      }
    }
  }

  function getModelByName(name: string, models: Model[]): Model | void {
    for (const model of models) {
      if (model.name === name) {
        return model
      }
    }
  }

  function getPropertyByName(name: string, model: Model): Model | void {
    for (const property of model.properties) {
      if (property.name === name) {
        return property
      }
    }
  }

  for (const model of models) {
    for (const prop of model.properties) {
      if (prop.extensions && prop.extensions.deepRelations) {
        // console.log([model.name, prop.type])
        const childModel = getModelByName(prop.type, models)
        if (childModel) {
          // console.log([childModel.name, childModel.export])

          if (childModel.export === "all-of") {
            for (const property of childModel.properties) {
              if (property.export === "reference") {
                const tmpModel = getModelByName(property.type, models)
                if (tmpModel) {
                  // console.log("HAHAHAHAHA")
                  for (const deepRelation of prop.extensions.deepRelations) {
                    const childProp = getPropertyByName(
                      deepRelation.name,
                      tmpModel
                    )
                    if (childProp) {
                      // console.log("lolololol")
                      model.imports.push(childProp.type)
                      deepRelation.base = childProp.type
                      deepRelation.isArray = childProp.export === "array"
                    }
                  }
                }
              }
              if (property.export === "interface") {
                // console.log("SNANSNANSNA")
                // console.log(property)
                for (const deepRelation of prop.extensions.deepRelations) {
                  const childProp = getPropertyByName(
                    deepRelation.name,
                    property
                  )
                  if (childProp) {
                    // console.log("HELLLLLO")
                    model.imports.push(childProp.type)
                    deepRelation.base = childProp.type
                    deepRelation.isArray = childProp.export === "array"
                  }
                }
              }
            }
          }

          for (const deepRelation of prop.extensions.deepRelations) {
            const childProp = getPropertyByName(deepRelation.name, childModel)
            if (childProp) {
              model.imports.push(childProp.type)
              deepRelation.base = childProp.type
              deepRelation.isArray = childProp.export === "array"
            }
          }
        }
        // console.log(prop.extensions.deepRelations)
      }
    }
  }

  /**
   * Bundle all query parameters in a single typed object
   * when x-codegen.queryParams is declared on the operation.
   */
  const operations = listOperations(openApi)
  for (const operation of operations) {
    if (operation.codegen.queryParams) {
      const definition = getDefinitionFromParametersQuery(
        operation.parametersQuery
      )
      const model = getModel(
        openApi,
        definition,
        true,
        operation.codegen.queryParams
      )
      models.push(model)
    }
  }

  for (const model in models) {
  }

  return models
}

/**
 * Combines and converts query parameters into schema properties.
 * Given a typical parameter OAS:
 * ```
 * parameters:
 *   - in: query
 *     name: limit
 *     schema:
 *       type: integer
 *       default: 10
 *     required: true
 *     description: Limit the number of results returned.
 * ```
 * Convert into a schema property:
 * ```
 * UnnamedSchema:
 *   type: object
 *   required:
 *     - limit
 *   properties:
 *     limit:
 *       description: Limit the number of results returned.
 *       type: integer
 *       default: 10
 * ```
 */
const getDefinitionFromParametersQuery = (
  parametersQuery: OperationParameter[]
): OpenApiSchema => {
  /**
   * Identify query parameters that are required (non-optional).
   */
  const required = parametersQuery
    .filter((parameter) => (parameter.spec as OpenApiParameter).required)
    .map((parameter) => (parameter.spec as OpenApiParameter).name)

  const properties: Dictionary<OpenApiSchema> = {}
  for (const parameter of parametersQuery) {
    const spec = parameter.spec as OpenApiParameter
    /**
     * Augment a copy of schema with description and deprecated
     * and assign it as a named property on the schema.
     */
    properties[spec.name] = Object.assign(
      { ...spec.schema },
      {
        description: spec.description,
        deprecated: spec.deprecated,
      }
    )
  }
  /**
   * Return an unnamed schema definition.
   */
  return {
    type: "object",
    required,
    properties,
  }
}
