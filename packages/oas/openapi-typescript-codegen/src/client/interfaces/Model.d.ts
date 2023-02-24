import type { Enum } from "./Enum"
import type { Schema } from "./Schema"

export type DeepRelation = {
  name: string
  properties: string[]
  base?: string
  isArray?: boolean
}

export interface Model extends Schema {
  name: string
  export:
    | "reference"
    | "generic"
    | "enum"
    | "array"
    | "dictionary"
    | "interface"
    | "one-of"
    | "any-of"
    | "all-of"
  type: string
  base: string
  template: string | null
  link: Model | null
  description: string | null
  deprecated?: boolean
  default?: string
  imports: string[]
  enum: Enum[]
  enums: Model[]
  properties: Model[]
  extensions?: {
    relations?: string[]
    deepRelations?: DeepRelation[]
  }
}
