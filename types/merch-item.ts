export interface MerchItem {
    id: number;
    name: string;
    description: string;
    price: number;
    disabled: boolean;
    sizes: Array<MerchSize>;
    images: Array<MerchImage>;
};

interface MerchSize {
    size: string;
    soldOut: boolean;
};

interface MerchImage {
    imageUrl: string;
    isPrimary: boolean;
};