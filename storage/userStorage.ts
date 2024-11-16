import { create } from "zustand";
import { UserData } from "../types/Api";

type UserState = {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (data: any) => set({ userData: data }),
}));
