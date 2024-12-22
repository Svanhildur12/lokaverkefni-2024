"use client"

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
export type DishType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  price: number;
  quantity: number;
};
export type DrinkType = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
  quantity: number;
  price: number;
};
export type OrderType = {
  id: number;
  email: string;
  date: string;
  time: string;
  dishes: DishType[];
  drinks: DrinkType[];
  guests: number;
  customerId: number;
};


export const createCustomer = async (email: string): Promise<{ id: number; email: string}> => {
  const res = await fetch("http://localhost:5052/api/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create customer: ${errorText}`);
  }
  const customer = await res.json();
  return customer;
};


export const getRandomDish = async (): Promise<Dish> => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  const response = await res.json();
  return response.meals[0];
};

export const fetchDrinkById = async (idDrink: number): Promise<Drink> => {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response.drinks[idDrink];
};

export const fetchDrinksById = async (idDrinks: number[]): Promise<Drink[]> => {
  const drinkPromises = idDrinks.map((idDrink) => fetchDrinkById(idDrink));
  return Promise.all(drinkPromises);
};

export const postOrder = async (order: OrderType): Promise<OrderType> => {
  const res = await fetch("http://localhost:5052/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to post data: ${errorText}`);
  }

  const newOrder =  await res.json();
  console.log("New order created:", newOrder);
  return newOrder;
};


export const getOrders = async (): Promise<OrderType[]> => {
  const res = await fetch("http://localhost:5052/api/orders");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log("Getting order:", response);

   return response.map((order: OrderType) => ({
    ...order,
    dishes: order.dishes || [],
    drinks: order.drinks || [],
  }));
};

export const fetchOrderById = async (id: number): Promise<OrderType> => {
    const res = await fetch(`http://localhost:5052/api/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch order: ${errorText}`);
    }
  
    const order = await res.json();
    console.log("Fetched order:", order);
    return order;
}
export const fetchOrderByEmail = async (email: string): Promise<OrderType[]> => {
  const res = await fetch(`http://localhost:5052/api/orders/byEmail/${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch orders: ${errorText}`);
  }

  const response: OrderType[] = await res.json();
  console.log("Fetched orders:", response);
  return response;
};

export const putUpdateOrder = async (id: number, order: OrderType): Promise<OrderType> => {
  const res = await fetch(`http://localhost:5052/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update order: ${errorText}`);
  }

  return await res.json();
};

export const deleteOrder = async (id: number): Promise<{Message: string}> => {
  const res = await fetch(`http://localhost:5052/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Could not find order with id')
  }
  return await res.json();
};

export const api = {
  getOrders,
  fetchOrderById,
  putUpdateOrder,
  deleteOrder, 
  postOrder,
  getRandomDish,
 fetchDrinkById,
 createCustomer,
 fetchOrderByEmail
}
