import { useLocation } from "react-router-dom";
import Title from "../components/common/Title";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { OrderSheet, OrderSheetDelivery } from "../models/order.model";

interface DeliveryForm extends OrderSheetDelivery {
  addressDetail: string;
}

function Order() {
  const location = useLocation();
  const { orderSheet, totalQuantity, orderIds } = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    const orderData: OrderSheet = {
      orderSheet: {
        ...orderSheet,
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
      orderIds,
    };

    console.log(orderData);
  };

  return (
    <>
      <Title size='large'>주문서 작성</Title>
      <CartStyle>
        <div className='content'>
          <div className='order-info'>
            <Title size='medium' color='text'>
              배송 정보
            </Title>
            <form action='' className='delivery'>
              <fieldset>
                <label htmlFor=''>주소</label>
                <div className='input'>
                  <InputText inputType='text' {...register("address", { required: true })} />
                </div>
                <Button size='medium' scheme='normal'>
                  주소 찾기
                </Button>
              </fieldset>
              {errors.address && <p>주소를 입력해주세요</p>}
              <fieldset>
                <label htmlFor=''>상세 주소</label>
                <div className='input'>
                  <InputText inputType='text' {...register("addressDetail", { required: true })} />
                </div>
              </fieldset>
              {errors.addressDetail && <p>상세 주소를 입력해주세요</p>}
              <fieldset>
                <label htmlFor=''>수령인</label>
                <div className='input'>
                  <InputText inputType='text' {...register("receiver", { required: true })} />
                </div>
              </fieldset>
              {errors.receiver && <p>수령인을 입력해주세요</p>}
              <fieldset>
                <label htmlFor=''>전화번호</label>
                <div className='input'>
                  <InputText inputType='text' {...register("contact", { required: true })} />
                </div>
              </fieldset>
              {errors.contact && <p>전화번호를 입력해주세요</p>}
            </form>
          </div>
          <div className='order-info'>
            <Title size='medium' color='text'>
              주문 상품
            </Title>
            <strong>총 {totalQuantity} 권</strong>
          </div>
        </div>
        <div className='summary'>
          <CartSummary totalQuantity={totalQuantity} totalPrice={orderSheet.totalPrice} />
          <Button size='large' scheme='primary' onClick={handleSubmit(handlePay)}>
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

export default Order;
