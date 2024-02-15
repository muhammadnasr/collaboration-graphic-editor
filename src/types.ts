//should be name "Object" according to our conventions but "Object" is reserved
//TODO: think of another name
export type DesignObject = {
  id: string;
  type: string;
  top: number;
  left: number;
  color: string;
};

interface CursorsMap {
  [key: string]: Cursor;
}

export type Design = {
  id?: string;
  objects: DesignObject[];
  cursors: CursorsMap;
};

export type Cursor = {
  id?: string;
  x: number;
  y: number;
};
