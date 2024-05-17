import { create } from "zustand";

interface AuthQuery {
  accessToken?: string;
  refreshToken?: string;
  phone?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  gender?: string;
  isActive?: boolean;
  isAdmin?: boolean;
  isStaff?: boolean;
  isSuperuser?: boolean;
  groups?: string[];
  userPermissions?: string[];
}

export interface AuthQueryStore {
  authQuery: AuthQuery;
  setAuthQuery: (authQuery: AuthQuery) => void;
  resetAuthQuery: () => void;
}

const useAuthQueryStore = create<AuthQueryStore>((set) => ({
  authQuery: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  setAuthQuery: (authQuery: AuthQuery) =>
    set((store) => {
      store.authQuery = authQuery;
      localStorage.setItem("userInfo", JSON.stringify(store.authQuery));
      return { authQuery: store.authQuery };
    }),
  resetAuthQuery: () =>
    set((store) => {
      store.authQuery = {};
      localStorage.setItem("userInfo", JSON.stringify(store.authQuery));
      return { authQuery: store.authQuery };
    }),
}));

export default useAuthQueryStore;
