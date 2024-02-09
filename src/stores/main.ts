import { create } from "zustand";
import { DesignState } from "../types";

interface State {
  designId: string | null;
  setDesignId: (designId: string) => void;
  setDesignState: (designState: DesignState) => void;
  leaveDesign: () => void;
  designState: DesignState | null;
}

export const useStore = create<State>((set) => ({
  designState: null,
  designId: null,
  setDesignId: (designId) => set(() => ({ designId })),
  setDesignState: (designState) => set(() => ({ designState })),
  leaveDesign: () => set(() => ({ designId: null, designState: null })),
}));
