import { create } from "zustand";

interface ProductQuery {
  ordering?: string;
  searchText?: string;
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setSearchText: (searchText: string) => void;
  setOrdering: (ordering: string) => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {},
  setSearchText: (searchText) => set(() => ({ productQuery: { searchText } })),
  setOrdering: (ordering) =>
    set((store) => ({
      productQuery: { ...store.productQuery, ordering: ordering },
    })),
}));

export default useProductQueryStore;
