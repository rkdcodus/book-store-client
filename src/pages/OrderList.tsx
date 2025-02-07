import { styled } from "styled-components";
import Title from "../components/common/Title";
import { useOrder } from "../hooks/useOrder";
import Button from "../components/common/Button";
import { useState } from "react";
import { formatDate, formatNumber } from "../utils/format";

function OrderList() {
  const { orders } = useOrder();
  const [more, setMore] = useState(false);

  return (
    <>
      <Title size='large'>주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>수량</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orders.id}</td>
              <td>{formatDate(orders.created_at, "YYYY.MM.DD")}</td>
              <td>{orders.address}</td>
              <td>{orders.receiver}</td>
              <td>{orders.contact}</td>
              <td>{orders.orders.length}</td>
              <td>{orders.total_price}원</td>
              <td>
                <Button size='small' scheme='normal' onClick={() => setMore(!more)}>
                  {more ? "닫기" : "자세히"}
                </Button>
              </td>
            </tr>
            {more && (
              <tr>
                <td></td>
                <td colSpan={8}>
                  <ul className='detail'>
                    {orders.orders.map((order) => (
                      <li>
                        <div>
                          <span>{order.bookId}</span>
                          <span>{order.title}</span>
                          <span>{order.summary}</span>
                          <span>{order.quantity}</span>
                          <span>{formatNumber(order.price)}원</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;
  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;
      li {
        list-style: square;
        text-align: left;
      }
      div {
        display: flex;
        padding: 8px 12px;
        gap: 8px;
      }
    }
  }
`;

export default OrderList;
