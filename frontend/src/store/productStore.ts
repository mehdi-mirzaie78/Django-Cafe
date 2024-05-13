import { create } from "zustand";

interface ProductQuery {
  ordering?: string;
  searchText?: string;
  categoryId?: string;
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setSearchText: (searchText: string) => void;
  setOrdering: (ordering: string) => void;
  setCategoryId: (category: string) => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {},
  setSearchText: (searchText) => set(() => ({ productQuery: { searchText } })),
  setOrdering: (ordering) =>
    set((store) => ({
      productQuery: { ...store.productQuery, ordering },
    })),
  setCategoryId: (categoryId) =>  
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        categoryId,
        searchText: undefined,
      },
    })),
}));

export default useProductQueryStore;
