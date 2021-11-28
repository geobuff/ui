import React, { FC, useContext } from "react";
import ShoppingCart from "../../components/ShoppingCart";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
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

  if (isLoading) {
    return <ShoppingCartPlaceholder />;
  }

  return (
    <ShoppingCart
      cart={cart}
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
