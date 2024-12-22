"use client";
import { CartItem, useCart } from "../context/CartContext";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { OrderType, api } from "../api";
import { useRouter, useSearchParams } from "next/navigation";
import { time } from "console";
import { Order } from "../../../orders-api/types";
import { id } from "date-fns/locale";

const OrderInfoComponent = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [editingOrder, setEditingOrder] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const { setEmail, setDate, setTime, setGuests, email, date, time, guests } =
    useCart();

  const router = useRouter();
  const searchParams = useSearchParams();
  const emailInput = searchParams.get("email") || "";

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedOrders = await api.fetchOrderByEmail(emailInput);
      setOrders(fetchedOrders);
      if (fetchedOrders.length > 0) {
        const firstOrder = fetchedOrders[0];
        setEmail(firstOrder.email);
        setDate(new Date(firstOrder.date));
        setTime(firstOrder.time);
        setGuests(firstOrder.guests);
        setSelectedOrder(firstOrder);
        calculateTotalPrice(firstOrder);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (emailInput) {
      fetchOrders();
    }
  }, [emailInput]);

  const calculateTotalPrice = (order: OrderType) => {
    const dishTotal = order.dishes.reduce(
      (acc, dish) => acc + dish.price * dish.quantity,
      0
    );
    const drinkTotal = order.drinks.reduce(
      (acc, drink) => acc + drink.price * drink.quantity,
      0
    );
    setTotalPrice(dishTotal + drinkTotal);
  };

  useEffect(() => {
    if (selectedOrder) {
      calculateTotalPrice(selectedOrder);
    }
  }, [selectedOrder]);

  const handleQuantityChange = (
    type: "dish" | "drink",
    id: string,
    quantity: number
  ) => {
    if (!selectedOrder) return;

    const updatedOrder = {
      ...selectedOrder,
      dishes:
        type === "dish"
          ? selectedOrder.dishes.map((dish) =>
              dish.idMeal === id ? { ...dish, quantity } : dish
            )
          : selectedOrder.dishes,
      drinks:
        type === "drink"
          ? selectedOrder.drinks.map((drink) =>
              drink.idDrink === id ? { ...drink, quantity } : drink
            )
          : selectedOrder.drinks,
    };

    setSelectedOrder(updatedOrder);
    calculateTotalPrice(updatedOrder);
  };

  const handleDeleteOrder = async (id: number) => {
    try {
      await api.deleteOrder(id);
      console.log(`Order with id ${id} deleted`);
      router.push("/");
    } catch (err) {
      console.error("Error deleting order:", err);
      setError("Failed to delete the order.");
    }
  };

  const handleEditOrder = () => {
    setEditingOrder(true);
  };

  const handleSaveOrder = async () => {
    if (!selectedOrder) return;

    try {
      const updatedOrder = await api.putUpdateOrder(
        selectedOrder.id!,
        selectedOrder
      );
      console.log("Order updated successfully:", updatedOrder);

      const userConfirmed = window.confirm(
        "Order updated successfully! Press OK to return to the home page."
      );

      if (userConfirmed) {
        router.push("/"); // Navigate to the home page
      } else {
        // Optional: Handle if the user cancels the navigation
        console.log("User chose to stay on the page.");
      }

      setSelectedOrder(updatedOrder);

      const fetchedOrders = await api.fetchOrderByEmail(updatedOrder.email);
      setOrders(fetchedOrders);

      setEditingOrder(false);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("404")) {
          alert(
            "Order updated successfully, but no orders found with the new email. Please refresh the page or check the email."
          );
          setEditingOrder(false);
          router.push("/");
        } else {
          console.error("Error updating order:", err.message);
          alert("Failed to update order.");
        }
      } else {
        console.error("Unknown error:", err);
        alert("An unknown error occurred.");
      }
    }
  };

  const handleRemoveItem = (type: "dish" | "drink", id: string) => {
    if (!selectedOrder) return;

    const updatedOrder = { ...selectedOrder };

    if (type === "dish") {
      updatedOrder.dishes = updatedOrder.dishes.filter(
        (dish) => dish.idMeal !== id
      );
    } else {
      updatedOrder.drinks = updatedOrder.drinks.filter(
        (drink) => drink.idDrink !== id
      );
    }

    setSelectedOrder(updatedOrder);
  };

  useEffect(() => {
    if (emailInput) {
      fetchOrders();
    }
  }, [emailInput]);

  if (loading) {
    return <p className="text-white text-center mt-5">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-5">{error}</p>;
  }

  return (
    <div className="container mx-auto px-auto p-4 text-yellow-100">
      <h2 className="text-2xl md:text-4xl md:mt-5 font-bold mb-4 flex justify-center">
        This is your Order!
      </h2>
      {selectedOrder && (
        <div
          key={`order-${selectedOrder.id}`}
          className="bg-black p-4 mb-10 mx-32"
        >
          <div className="mb-4">
            <label
              className="flex justify-center text-yellow-100 mb-1"
              htmlFor="email"
            >
              Email:
            </label>
            <form className="flex justify-center">
              <input
                type="email"
                id="email"
                value={selectedOrder.email}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, email: e.target.value })
                }
                disabled={!editingOrder}
                className="flex justify-items-center w-64 p-2 text-black rounded"
              />
            </form>
          </div>
          <div className="mb-4">
            <label className="flex justify-center text-yellow-100 mb-1">
              Date:
            </label>
            <form className="flex justify-center">
              <input
                type="date"
                value={selectedOrder.date.split("T")[0]}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, date: e.target.value })
                }
                disabled={!editingOrder}
                className="flex justify-center w-64 p-2 text-black rounded"
              />
            </form>
          </div>
          <div className="mb-4">
            <label className="flex justify-center text-yellow-100 mb-1">
              Time:
            </label>
            <form className="flex justify-center">
              <input
                type="time"
                value={selectedOrder.time}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, time: e.target.value })
                }
                disabled={!editingOrder}
                className="flex justify-center w-64 p-2 text-black rounded"
              />
            </form>
          </div>
          <div className="mb-4">
            <label className="flex justify-center text-yellow-100 mb-1">
              Guests:
            </label>
            <form className="flex justify-center">
              <input
                type="number"
                value={selectedOrder.guests}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    guests: Number(e.target.value),
                  })
                }
                disabled={!editingOrder}
                className="flex justify-center w-20 p-2 text-black rounded"
              />
            </form>
          </div>
          {selectedOrder.dishes.map((dish) => (
            <div key={`dish-${dish.idMeal}`} className="flex justify-center">
              <div className="mt-10 mx-10">
                <Image
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  width={100}
                  height={100}
                  className="rounded mr-4"
                />
                <div>
                  <h4 className=" text-lg text-yellow-100">{dish.strMeal}</h4>
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
                    disabled={!editingOrder}
                    className="w-16 p-1 text-black rounded"
                    min="1"
                  />
                  <button
                    onClick={() => handleRemoveItem("dish", dish.idMeal)}
                    className="ml-4 text-red-500 font-bold mb-10"
                    disabled={!editingOrder}
                  >
                    Remove
                  </button>
                  {selectedOrder.drinks.map((drink) => (
                    <div key={`drink-${drink.idDrink}`}>
                      <Image
                        src={drink.strDrinkThumb}
                        alt={drink.strDrink}
                        width={100}
                        height={100}
                        className="rounded mr-4"
                      />
                      <div>
                        <h4 className=" text-lg text-yellow-100">
                          {drink.strDrink}
                        </h4>
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
                          disabled={!editingOrder}
                          className="w-16 p-1 text-black rounded"
                          min="1"
                        />
                        <button
                          onClick={() =>
                            handleRemoveItem("drink", drink.idDrink)
                          }
                          className="ml-4 text-red-500 font-bold"
                          disabled={!editingOrder}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex justify-center mt-10">
                        <button
                          onClick={
                            editingOrder ? handleSaveOrder : handleEditOrder
                          }
                          className="flex justify-center bg-yellow-500 text-black font-bold py-2 px-4 rounded mr-4"
                        >
                          {editingOrder ? "Save Changes" : "Edit Order"}
                        </button>

                        <button
                          onClick={() => handleDeleteOrder(selectedOrder.id!)}
                          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete Order
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <h3 className="text-center text-2xl font-bold text-white bg-red-600 p-2 mt-4 w-96">
                          Total: {totalPrice} kr
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      ;
    </div>
  );
};

export default OrderInfoComponent;
