export interface IProduct {
  id: string;
  size?: { width: number; height: number };
  imageUrl: string;
  name: string;
  count: number;
  weight: string;
  comments?: {
    id: number;
    productId: number;
    description: string;
    date: string;
  }[];
}

export interface IProductWithouId extends Omit<IProduct, "id"> {}
