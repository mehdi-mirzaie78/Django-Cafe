interface Media {
  id: number;
  file_type: string;
  file: string;
}

interface Product {
  id: number;
  categories: number[];
  media: Media[];
  name: string;
  slug: string;
  description: string;
  unitPrice: number;
  discount: number;
  price: number;
  stock: number;
  rating: number;
}

export default Product;
