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

export const useStore = create<State>((set) => ({
  currentUserId: null,
  setCurrentUserId: (currentUserId) => set(() => ({ currentUserId })),
  designId: null,
  setDesignId: (designId) => set(() => ({ designId })),
  design: null,
  setDesign: (design) => set(() => ({ design })),
  leaveDesign: () => set(() => ({ designId: null, design: null })),
  historyManager: new HistoryManager(),
}));