export interface TileType {
  id: number;
  value: number;
  row: number;
  col: number;
}

export type Grid = Array<Array<TileType | null>>;