export type Dish = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  price: number;
  quantity: number;
}
export type Drink = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
  quantity: number;
  price: number;
}

export type OrderType = {
  id: number;
  email: string;
  dish: Dish[];
  drinks: Drink[];
  count: number;
  date: Date;
  time: number;
};

const getOrder = async (): Promise<OrderType[]> => {
  const res = await fetch("http://localhost:3001/api/orders");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log("Getting order:", response);
  return response;
};

const postOrder = async (order: OrderType): Promise<OrderType> => {
  const res = await fetch("http://localhost:3001/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  const response = await res.json();
  console.log(response);
  return response;
};

export const api = {
  getOrder,
  postOrder,
};
