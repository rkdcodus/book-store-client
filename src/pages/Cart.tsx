import { styled } from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

function Cart() {
  const { carts, deleteCartItem } = useCart();

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleDelete = (id: number) => {
    deleteCartItem(id);
  };

  return (
    <>
      <Title size='large'>장바구니</Title>
      <CartStyle>
        <div className='content'>
          {carts.map((cart) => (
            <CartItem
              cart={cart}
              key={cart.orderId}
              checkedItems={checkedItems}
              onCheck={handleCheckItem}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className='summary'></div>
      </CartStyle>
    </>
  );
}

const CartStyle = styled.div``;

export default Cart;
