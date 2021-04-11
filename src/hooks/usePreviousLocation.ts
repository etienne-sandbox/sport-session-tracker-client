import create from "zustand";
import { Location } from "history";

type State = {
  previousLocation: Location | null;
  setPreviousLocation: (val: Location) => void;
};

export const usePreviousLocation = create<State>((set) => ({
  previousLocation: null,
  setPreviousLocation: (val: Location) => set({ previousLocation: val }),
}));
