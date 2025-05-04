export interface TileType {
  id: number;
  value: number;
  row: number;
  col: number;
}

export interface TilePosition {
  row: number;
  col: number;
}

export type Grid = Array<Array<TileType | null>>;

export interface SwapState {
  isSwapMode: boolean;
  firstTile: TilePosition | null;
  secondTile: TilePosition | null;
}

export interface DeleteState {
  isDeleteMode: boolean;
  numberToDelete: number | null;
}