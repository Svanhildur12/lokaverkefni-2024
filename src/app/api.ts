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
  dish: Dish;
  drinks: Drink[];
  count: number;
  date: string;
  time: string;
};

const getOrders = async (): Promise<OrderType[]> => {
  const res = await fetch("http://localhost:3001/api/orders");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log("Getting order:", response);
  return response;
};

export const postOrder = async (order: OrderType): Promise<OrderType> => {
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

export const getOrderByEmail = async (email: string): Promise<OrderType> => {
    const res = await fetch(`http://localhost:3001/api/order/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Could not find order with email");
      }
      const response = await res.json()
      console.log(response)
      return response;
}
const putUpdateOrder =async (order: OrderType): Promise<OrderType> => {
  const res = await fetch("http://localhost:3001/api/update-order", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Email does not exist, cannot update");
  }

  const response = await res.json();
  console.log(response);
  return response;
};
const deleteOrder = async (id: number): Promise<OrderType> => {
  const res = await fetch(`http://localhost:3001/api/order/${id}"`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Could not find order with id')
  }

  const response = await res.json()
  console.log(response)
  return response
}


export const api = {
  getOrders,
  postOrder,
  getOrderByEmail,
  putUpdateOrder,
  deleteOrder
}
