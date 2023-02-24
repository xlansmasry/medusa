export interface WithExtendedRelationsExtension {
  "x-extended-relations"?: {
    model: string
    defaults?: string[]
    totals?: string[]
  }
}
