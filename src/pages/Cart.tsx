import { styled } from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSummary } from "../models/order.model";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();
  const { carts, isEmpty, deleteCartItem } = useCart();

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

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해주세요");
      return;
    }

    const orderData: OrderSummary = {
      orderSheet: {
        totalPrice,
      },
      orderIds: checkedItems,
      totalQuantity,
    };
    showConfirm("주문하시겠습니까?", () => {
      navigate("/order", { state: orderData });
    });
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.orderId)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.orderId)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  return (
    <>
      <Title size='large'>장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
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
            <div className='summary'>
              <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
              <Button size='large' scheme='primary' onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            title='장바구니가 비었습니다.'
            icon={<FaShoppingCart />}
            description={<>장바구니를 채워보세요.</>}
          />
        )}
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }
  }
`;

export default Cart;
