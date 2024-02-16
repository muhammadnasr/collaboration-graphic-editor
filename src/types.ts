//DesignObject should be named "Object" according to our conventions but "Object" type is reserved
//TODO: think of another name

export type DesignObject = {
  id: string;
  type: string;
  top: number;
  left: number;
  color: string;
};

export interface CursorsMap {
  [key: number]: Cursor;
}

export type Design = {
  id?: string;
  objects: DesignObject[];
  cursors: CursorsMap;
};

export type Cursor = {
  userId: number;
  x: number;
  y: number;
};
