import { DesignObject } from "../types";

export default class Command {
  constructor(private oldDesignObject: DesignObject, private updatedDesignObject: DesignObject) {
  }
  getCurrentUserId(): number | null  {
    return this.updatedDesignObject.selectedBy;
  }

  getObjectId(): string  {
    return this.updatedDesignObject.id;
  }

  execute() {
    return this.updatedDesignObject
  }

  undo() {
    return this.oldDesignObject
  }

}