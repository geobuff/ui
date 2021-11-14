export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
  quantity?: number;
}
