import { styled } from "styled-components";
import { Cart } from "../../models/cart.model";
import Button from "../common/Button";
import Title from "../common/Title";
import { formatNumber } from "../../utils/format";
import CheckIconButton from "./CheckIconButton";
import { useMemo } from "react";

interface Props {
  cart: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void;
}

function CartItem({ cart, checkedItems, onCheck }: Props) {
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.orderId);
  }, [checkedItems, cart.orderId]);

  const handleCheck = () => {
    onCheck(cart.orderId);
  };

  return (
    <CartItemStyle>
      <div className='info'>
        <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        <div>
          <Title size='medium'>{cart.title}</Title>
          <p className='summary'>{cart.price}</p>
          <p className='price'>{formatNumber(cart.price)}원</p>
          <p className='quantity'>{cart.quantity}권</p>
        </div>
      </div>
      <Button size='medium' scheme='normal'>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`;

export default CartItem;
