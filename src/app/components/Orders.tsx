"use client";
import { CartItem, useCart } from "../context/CartContext";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { OrderType, api } from "../api";

const Orders = () => {
  const { cart, setQuantity, date, time, guests, email } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orders, setOrders] = useState<OrderType[]>([]);

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

  useEffect(() => {
    calculateTotalPrice();
  }, [orders]);

  const calculateTotalPrice = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };
  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantity(id, quantity);
  };
  const handleDeleteOrder = async (id: number) => {
    try {
      await api.deleteOrder(id);
      console.log(`Order with id ${id} deleted`);
      fetchOrder();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <div>
        <div className="container mx-auto p-4 text-yellow-100">
          <h2 className="text-2xl font-bold mb-4 flex justify-center">
            Receipt
          </h2>
        </div>
        <div className="mx-2">
          {orders.length === 0 ? (
            <p className="flex justify-center text-white underline text-3xl font-bold bg-red-600">
              Your cart is empty
            </p>
          ) : (
            <div className="">
              {orders.map((orderItem) => (
                <div
                  key={orderItem.id.toString()}
                  className="flex items-center justify-between mb-4"
                >
                  <Image
                    src={orderItem.dish.strMealThumb}
                    alt={orderItem.dish.strMeal}
                    width={100}
                    height={100}
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-xl font-semibold text-yellow-100 underline">
                      {orderItem.dish.strMeal}
                    </h3>
                    <div className="flex items-center mt-2">
                      <label className="mr-2 text-white">Quantity:</label>
                      <input
                        type="number"
                        value={orderItem.dish.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            orderItem.id.toString(),
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16 p-2 border rounded"
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold text-white bg-black">
                      {orderItem.dish.price * orderItem.dish.quantity}kr
                    </p>
                    <button
                      className="ml-4 p-2 bg-red-600 text-white rounded"
                      onClick={() => handleDeleteOrder(orderItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="">
            <h3 className="flex justify-center text-xl font-bold text-white bg-red-600">
              Total: {totalPrice}kr
            </h3>
          </div>
          <div className="">
            <h3 className=" flex justify-center text-xl font-bold text-white bg-red-600">
              Selected Date: {date ? date.toDateString() : "None"}
            </h3>
          </div>
          <div className="">
            <h3 className="flex justify-center text-xl font-bold text-white bg-red-600">
              Selected Time: {time || "None"}
            </h3>
          </div>
          <div className="">
            <h3 className="flex justify-center text-xl font-bold text-white bg-red-600">
              Number of Guests: {guests}
            </h3>
            <div className="">
              <h3 className="flex justify-center text-xl font-bold text-white bg-red-600">
                Email address: {email}
              </h3>
              <p className="text-white font-bold ">
                HERE YOU CAN CONFIRM YOUR ORDER
              </p>
              <button className="text-white font-bold text-2xl">
                CONFIRM ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
