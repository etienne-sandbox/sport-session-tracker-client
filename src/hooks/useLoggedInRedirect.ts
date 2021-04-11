import create from "zustand";
import { Location } from "history";

type State = {
  redirect: Location | null;
  setRedirect: (val: Location) => void;
};

export const useLoggedInRedirectStore = create<State>((set) => ({
  redirect: null,
  setRedirect: (val: Location) => set({ redirect: val }),
}));
