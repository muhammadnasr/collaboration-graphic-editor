import { create } from "zustand";
import { Design } from "../types";
import HistoryManager from "../history/HistoryManager";

interface State {
  currentUserId: number | null;
  setCurrentUserId: (currentUserId: number) => void;
  designId: string | null;
  setDesignId: (designId: string) => void;
  design: Design | null;
  setDesign: (design: Design) => void;
  leaveDesign: () => void;
  historyManager: HistoryManager;
}

export const useStore = create<State>((set) => {
  const historyManager = new HistoryManager();

  return {
    currentUserId: null,
    setCurrentUserId: (userId: number) => set(() => ({ currentUserId: userId })),
    designId: null,
    setDesignId: (designId: string) => set(() => ({ designId })),
    design: null,
    setDesign: (design: Design) => { 
      set(() => ({ design }));
      historyManager.updateObjects(design.objects);
     },
    leaveDesign: () => set(() => ({ designId: null, design: null })),
    historyManager,
  };
});
