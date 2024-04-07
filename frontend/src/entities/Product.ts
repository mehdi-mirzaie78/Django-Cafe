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
  unit_price: number;
  discount: number;
  price: number;
  stock: number;
}

export default Product;
