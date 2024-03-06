import { DesignObject } from "../types";
import Command from "./Command";

export default class HistoryManager {

  undoStack: Command[] = [];
  redoStack: Command[] = [];
  objects: DesignObject[] = [];

  clear() {
    this.undoStack = [];
    this.redoStack = [];
    this.objects = [];
  }


  updateObjects(objects: DesignObject[]) {
    this.objects = objects;
  }

  executeCommand(command: Command) {
    this.undoStack.push(command);
    this.redoStack = []; // Clear the redo stack whenever a new command is executed
  }

  undo() {
    if (this.undoStack.length === 0) {
      return null;
    }

    //peaking the top command to check for permissions, skip if not allowed
    const command = this.undoStack[this.undoStack.length - 1];
    //find object with same id as in the command from design objects
    let currentObject = this.objects.find((obj) => obj.id === command.getObjectId());
    if (command.getCurrentUserId() !== currentObject?.selectedBy) {
      this.showErrorApplyingActionToObject();
      return null;
    }

    this.undoStack.pop();
    const designObject: DesignObject = command.undo();
    this.redoStack.push(command);
    return designObject;
  }

  private showErrorApplyingActionToObject() {
    alert("You are not allowed to perform this action on this without selecting it!");
  }

  redo() {
    if (this.redoStack.length === 0) {
      return null;
    }

    //peaking the top command to check for permissions, skip if not allowed
    const command = this.redoStack[this.redoStack.length - 1];
    let currentObject = this.objects.find((obj) => obj.id === command.getObjectId());
    if (command.getCurrentUserId() !== currentObject?.selectedBy) {
      this.showErrorApplyingActionToObject();
      return null;
    }

    this.redoStack.pop();
    const designObject: DesignObject = command.execute();
    this.undoStack.push(command);
    return designObject;
  }

  nothingToUndo(): boolean {
    return this.undoStack.length === 0;
  }

  nothingToRedo(): boolean {
    return this.redoStack.length === 0;
  }
}