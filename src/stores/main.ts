import { create } from "zustand";
import { Design } from "../types";

interface State {
  designerName: string;
  setDesignerName: (designerName: string) => void;
  designId: string | null;
  setDesignId: (designId: string) => void;
  design: Design | null;
  setDesign: (design: Design) => void;
  leaveDesign: () => void;
}

export const useStore = create<State>((set) => ({
  designerName: "anonymous",
  setDesignerName: (designerName) => set(() => ({ designerName })),
  designId: null,
  setDesignId: (designId) => set(() => ({ designId })),
  design: null,
  setDesign: (design) => set(() => ({ design })),
  leaveDesign: () => set(() => ({ designId: null, design: null })),
}));