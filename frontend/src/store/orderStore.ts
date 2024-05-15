import { create } from "zustand";
import Table from "../entities/Table";

export interface OrderQuery {
  orderType: string;
  table?: Table;
  addressId?: number;
  phone?: string;
}

interface OrderQueryStore {
  orderQuery: OrderQuery;
  setOrderQuery: (orderQuery: OrderQuery) => void;
  setOrderType: (orderType: string) => void;
  setTable: (table: Table) => void;
  setAddressId: (addressId: number) => void;
  setPhone: (phone: string) => void;
}

const useOrderQueryStore = create<OrderQueryStore>((set) => ({
  orderQuery: { orderType: "" },
  setOrderQuery: (orderQuery: OrderQuery) =>
    set((store) => {
      store.orderQuery = orderQuery;
      return { orderQuery: store.orderQuery };
    }),
  setOrderType: (orderType: string) =>
    set((store) => {
      store.orderQuery.orderType = orderType;
      return { orderQuery: store.orderQuery };
    }),
  setTable: (table: Table) =>
    set((store) => {
      store.orderQuery.table = table;
      return { orderQuery: store.orderQuery };
    }),
  setAddressId: (addressId: number) =>
    set((store) => {
      store.orderQuery.addressId = addressId;
      return { orderQuery: store.orderQuery };
    }),
  setPhone: (phone: string) =>
    set((store) => {
      store.orderQuery.phone = phone;
      return { orderQuery: store.orderQuery };
    }),
}));

export default useOrderQueryStore;
