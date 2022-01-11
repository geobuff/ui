export interface Badge {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  background: string;
  border: string;
  progress: number;
  total: number;
  isComplete: boolean;
}
