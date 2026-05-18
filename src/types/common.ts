/** Result of an alias removal operation */
export interface RemovedAlias {
  /** The alias that was removed */
  alias: string;
  /** `true` if the alias was successfully removed */
  removed: boolean;
}

/** Result of deleting an entity by ID */
export interface RemovedElement {
  /** Identifier of the deleted entity */
  id: number;
  /** `true` if the entity was successfully deleted */
  removed: boolean;
}
