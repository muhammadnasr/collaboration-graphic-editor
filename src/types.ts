export type DesignObject = {
  id: string;
  type: string;
  top: number;
  left: number;
  color: string;
};

export type DesignState = {
  id?: string;
  objects: DesignObject[];
};

export type Cursor = {
  id?: string;
  x: number;
  y: number;
};
