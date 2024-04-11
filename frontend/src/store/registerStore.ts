import { create } from "zustand";

interface RegisterQuery {
  phone?: string;
  otp?: string;
}

interface RegisterQueryStore {
  registerQuery: RegisterQuery;
  setPhone: (phone: string) => void;
  setOtp: (otp: string) => void;
}

const useRegisterQueryStore = create<RegisterQueryStore>((set) => ({
  registerQuery: {
    phone:
      JSON.parse(localStorage.getItem("registerInfo") || "{}")?.phone || "",
  },
  setPhone: (phone) =>
    set((store) => {
      store.registerQuery.phone = phone;
      localStorage.setItem("registerInfo", JSON.stringify(store.registerQuery));
      return { registerQuery: store.registerQuery };
    }),
  setOtp: (otp) =>
    set((store) => ({ registerQuery: { ...store.registerQuery, otp } })),
}));

export default useRegisterQueryStore;
