import { create } from "zustand";

export interface PaymentQuery {
  orderId: number;
}

interface PaymentQueryStore {
  paymentQuery: PaymentQuery;
  setPaymentQuery: (paymentQuery: PaymentQuery) => void;
  resetPaymentQuery: () => void;
}

const usePaymentQueryStore = create<PaymentQueryStore>((set) => ({
  paymentQuery: JSON.parse(localStorage.getItem("payment") || "{}"),
  setPaymentQuery: (paymentQuery: PaymentQuery) =>
    set((store) => {
      store.paymentQuery = paymentQuery;
      localStorage.setItem("payment", JSON.stringify(store.paymentQuery));
      return { paymentQuery: store.paymentQuery };
    }),
  resetPaymentQuery: () =>
    set((store) => {
      store.paymentQuery = { orderId: 0 };
      localStorage.setItem("payment", JSON.stringify("{}"));
      return { paymentQuery: store.paymentQuery };
    }),
}));

export default usePaymentQueryStore;
