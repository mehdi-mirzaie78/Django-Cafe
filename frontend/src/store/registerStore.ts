import { create } from "zustand";

interface RegisterQuery {
  phoneNumber?: string;
}

interface RegisterQueryStore {
  registerQuery: RegisterQuery;
  setPhoneNumber: (phoneNumber: string) => void;
}

const useRegisterQueryStore = create<RegisterQueryStore>((set) => ({
  registerQuery: { phoneNumber: localStorage.getItem("phoneNumber") || "" },
  setPhoneNumber: (phoneNumber) =>
    set((store) => {
      store.registerQuery.phoneNumber = phoneNumber;
      localStorage.setItem("registerInfo", JSON.stringify(store.registerQuery));
      return { registerQuery: { phoneNumber } };
    }),
}));

export default useRegisterQueryStore;
