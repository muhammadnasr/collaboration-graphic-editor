import { DesignObject } from '../types';
import Command from './Command';

export default class HistoryManager {
   undoStack: Command[] = [];
   redoStack: Command[] = [];

  executeCommand(command: Command) {
    this.undoStack.push(command);
    this.redoStack = []; // Clear the redo stack whenever a new command is executed
  }

  undo() {
    const command = this.undoStack.pop();
    if (command) {
      const designObject : DesignObject = command.undo();
      this.redoStack.push(command);      
      return designObject;
    }
    return null;
  }

  redo() {
    const command = this.redoStack.pop();
    if (command) {
      const designObject : DesignObject = command.execute();
      this.undoStack.push(command);
      return designObject;
    }
    return null;
  }

  nothingToUndo(): boolean {
    return this.undoStack.length === 0;
  }

  nothingToRedo(): boolean {
    return this.redoStack.length === 0;
  }
}