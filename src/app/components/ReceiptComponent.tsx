"use client";
import { useCart } from "../context/CartContext";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { OrderType, api } from "../api";
import { useRouter } from "next/navigation";

const ReceiptComponent = () => {
  const {
    setQuantity,
    date,
    time,
    guests,
    email,
    clearCart,
    setEmail,
    setDate,
    setTime,
    setGuests,
    setCart,
  } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const router = useRouter();

  const fetchOrder = useCallback(async () => {
    try {
      const fetchOrders = await api.getOrders();
      setOrders(fetchOrders);
      if (fetchOrders.length > 0) {
        const firstOrder = fetchOrders[0];
        setEmail(firstOrder.email);
        setDate(new Date(firstOrder.date));
        setTime(firstOrder.time);
        setGuests(firstOrder.guests);
        setCart;
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [setEmail, setDate, setTime, setGuests, setCart]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    calculateTotalPrice();
  }, [orders]);

  const calculateTotalPrice = () => {
    const totalPrice = orders.reduce((acc, order) => {
      const dishTotal =
        order.dishes?.reduce((dishAcc, dish) => {
          return dishAcc + dish.price * dish.quantity;
        }, 0) || 0;
      const drinkTotal =
        order.drinks?.reduce((drinkAcc, drink) => {
          return drinkAcc + drink.price * drink.quantity;
        }, 0) || 0;
      return acc + dishTotal + drinkTotal;
    }, 0);
    setTotalPrice(totalPrice);
  };

  const handleQuantityChange = (
    type: "dish" | "drink",
    id: string,
    quantity: number
  ) => {
    setQuantity(id, quantity);
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (type === "dish") {
          return {
            ...order,
            dishes: order.dishes.map((dish) =>
              dish.idMeal == id ? { ...dish, quantity } : dish
            ),
          };
        }
        if (type === "drink") {
          return {
            ...order,
            drinks: order.drinks.map((drink) =>
              drink.idDrink === id ? { ...drink, quantity } : drink
            ),
          };
        }
        return order;
      })
    );
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

  const handleClearCart = () => {
    console.log("Before clearCart:", localStorage.getItem("cart"));
    clearCart();
    console.log("After clearCart:", localStorage.getItem("cart"));
    router.push("/");
  };

  const formattedDate = date ? date.toLocaleDateString() : "N/A";
  const formattedTime = time || "N/A";
  const numberOfGuests = guests || 0;
  const emailAddress = email || "N/A";

  return (
    <>
      <div className="">
        <div className="container mx-auto p-4 text-yellow-100">
          <h2 className="text-2xl md:text-4xl md:mt-5 font-bold mb-4 flex justify-center">
            Receipt
          </h2>
        </div>
        <div className="mx-2 md:mx-10 lg:mx-32 ">
          {orders.length === 0 ? (
            <p className="flex justify-center text-white underline text-3xl font-bold bg-red-600">
              Your cart is empty
            </p>
          ) : (
            <div className="bg-black p-2">
              {orders.map((order) => (
                <div key={order.id}>
                  {order.dishes.map((dish) => (
                    <div
                      key={dish.idMeal}
                      className="flex items-center justify-evenly mb-4"
                    >
                      <Image
                        className="w-32 h-32 md:w-52 md:h-48 "
                        src={dish.strMealThumb}
                        alt={dish.strMeal}
                        width={100}
                        height={100}
                      />
                      <div className="flex-1 ml-2 bg-black">
                        <h3 className="text-md md:text-2xl font-semibold text-yellow-100 underline">
                          {dish.strMeal}
                        </h3>
                        <div className="flex items-center mt-2">
                          <label className="mr-2 text-white md:text-xl">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            value={dish.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                "dish",
                                dish.idMeal,
                                Number(e.target.value)
                              )
                            }
                            className=" w-10 md:w-20 md:text-xl p-2 border rounded"
                            min="1"
                          />
                        </div>
                      </div>
                      <div className="contents ml-10">
                        <p className=" text-xl md:text-2xl text-white rounded-md ">
                          {dish.price * dish.quantity},-
                        </p>
                        <button
                          className="mb-28 mx-2 text-sm md:mb-32 md:text-xl bg-red-600 text-white rounded"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                  {order.drinks.map((drink) => (
                    <div
                      key={drink.idDrink}
                      className="flex items-center justify-evenly mb-4"
                    >
                      <Image
                        className="w-32 h-32 md:w-52 md:h-48 "
                        src={drink.strDrinkThumb}
                        alt={drink.strDrink}
                        width={100}
                        height={100}
                      />
                      <div className="flex-1 ml-2 bg-black">
                        <h3 className="text-md md:text-2xl font-semibold text-yellow-100 underline">
                          {drink.strDrink}
                        </h3>
                        <div className="flex items-center mt-2">
                          <label className="mr-2 text-white md:text-xl">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            value={drink.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                "drink",
                                drink.idDrink,
                                Number(e.target.value)
                              )
                            }
                            className=" w-10 md:w-20 md:text-xl p-2 border rounded"
                            min="1"
                          />
                        </div>
                      </div>
                      <div className="contents ml-10">
                        <p className=" text-xl md:text-2xl text-white rounded-md ">
                          {drink.price * drink.quantity},-
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="">
            <h3 className="flex justify-center text-xl md:text-4xl font-bold text-white bg-red-600">
              Total: {totalPrice}kr
            </h3>
          </div>
          <div className="">
            <h3 className=" flex justify-center text-xl md:text-2xl font-bold text-white bg-red-600">
              Date: {formattedDate}
            </h3>
          </div>
          <div className="">
            <h3 className="flex justify-center text-xl md:text-2xl font-bold text-white bg-red-600">
              Time: {formattedTime}
            </h3>
          </div>
          <div className="">
            <h3 className="flex justify-center text-xl md:text-2xl font-bold text-white bg-red-600">
              Guests: {numberOfGuests}
            </h3>
            <div className="">
              <h3 className="flex justify-center text-xl md:text-2xl font-bold text-white bg-red-600">
                Email: {emailAddress}
              </h3>
              <div className="flex justify-center mt-10 mb-10 md:mb-10 lg:mb-10">
                <button
                  className="text-yellow-100 border-2 border-black  bg-black font-bold md:text-2xl"
                  onClick={handleClearCart}
                >
                  CONFIRM ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptComponent;
