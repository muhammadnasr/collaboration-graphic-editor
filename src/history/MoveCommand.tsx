import { DesignObject } from '../types';
import Command from './Command';

export default class MoveCommand implements Command {
  constructor(private oldDesignObject: DesignObject, private updatedDesignObject: DesignObject) {
  }

  execute() {
    return this.updatedDesignObject
  }

  undo() {
    return this.oldDesignObject
  }

}