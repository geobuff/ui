export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  sizeId: number;
  sizeName: string;
  imageUrl: string;
  route: string;
  quantity?: number;
}
