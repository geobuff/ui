import React, { FC, useContext } from "react";
import ShoppingCart from "../../components/ShoppingCart";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import useMerch from "../../hooks/UseMerch";
import ShoppingCartPlaceholder from "../../placeholders/ShoppingCartPlaceholder";

const ShoppingCartContainer: FC = () => {
  const {
    cart,
    isLoading,
    updateQuantity,
    removeItem,
    getTotal,
    discountAmount,
    checkingDiscount,
    discountSuccess,
    discountError,
    applyDiscount,
  } = useContext(ShoppingCartContext);

  const { merch, isLoading: isMerchLoading } = useMerch();

  const getMax = (merchId: number, sizeId: number): number => {
    const item = merch.find((x) => x.id === merchId);
    return item.sizes.find((x) => x.id === sizeId).quantity;
  };

  if (isLoading || isMerchLoading) {
    return <ShoppingCartPlaceholder />;
  }

  return (
    <ShoppingCart
      cart={cart}
      getMax={getMax}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      onGetTotal={getTotal}
      discountAmount={discountAmount}
      checkingDiscount={checkingDiscount}
      discountSuccess={discountSuccess}
      discountError={discountError}
      applyDiscount={applyDiscount}
    />
  );
};

export default ShoppingCartContainer;
