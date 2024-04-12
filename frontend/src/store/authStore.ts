import { create } from "zustand";

interface AuthQuery {
  accessToken?: string;
  refreshToken?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthQueryStore {
  authQuery: AuthQuery;
  setAuthQuery: (authQuery: AuthQuery) => void;
}

const useAuthQueryStore = create<AuthQueryStore>((set) => ({
  authQuery: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  setAuthQuery: (authQuery: AuthQuery) =>
    set((store) => {
      store.authQuery = authQuery;
      localStorage.setItem("userInfo", JSON.stringify(store.authQuery));
      return { authQuery: store.authQuery };
    }),
}));

export default useAuthQueryStore;
