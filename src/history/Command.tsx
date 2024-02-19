
import { DesignObject } from '../types'; // Import the DesignObject type

export default interface Command {
  execute(): DesignObject;
  undo(): DesignObject;
}