"use client";
import { useCallback, useEffect, useState } from "react";
import { OrderType, api } from "../api";
import { useCart } from "../context/CartContext";

const Order = ({ order }: { order: OrderType }) => {
  const contextValue = true;
  return (
    <p key={order.id}>
      {contextValue && (
        <button
          type="button"
          onClick={() => {
            console.log("delete, should be hidden when context is toggled off");
          }}
        >
          Delete
        </button>
      )}
      {order.dish.strMeal}: {order.dish.price}
    </p>
  );
};
const Orders = () => {
  const [orders, setOrders] = useState<OrderType[]>();

  const fetchOrder = useCallback(async () => {
    const fetchOrders = await api.getOrders();
    setOrders(fetchOrders);
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (!orders) {
    return <p>Loading...</p>;
  }

  return (
    // <---1 Wrap this component with a context
    <div className="m-10 text-white">
      {orders.map((order) => (
        <Order order={order} key={order.id} />
      ))}
    </div>
    // 1--->
  );
};

export default Orders;
