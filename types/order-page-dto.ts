import { Order } from "./order";

export interface OrderPageDto {
  orders: Order[];
  hasMore: boolean;
}
