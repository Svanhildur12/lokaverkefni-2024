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
  price?: number;
  email: string;
  count: number;
  date: string;
  time: string;
  id: number;
  dish: DishType;
  drinks: DrinkType[];
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

export const postOrder =  async (order: OrderType): Promise<OrderType> => {
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
 return res.json();
};

export const getOrders = async (): Promise<OrderType[]> => {
  const res = await fetch("http://localhost:3001/api/orders");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log("Getting order:", response);
  response.forEach((order: OrderType) => {
    order.drinks = order.drinks || []
  })
  return response;
};

export const fetchOrderByEmail = async (email: string) => {
    const res = await fetch(`http://localhost:3001/api/order/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Could not find order with email");
      }
      const response = await res.json();
      console.log(response)
      return response;
}

export const putUpdateOrder =async (order: OrderType): Promise<OrderType> => {
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

export const deleteOrder = async (id: number): Promise<OrderType> => {
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
  fetchOrderByEmail,
  putUpdateOrder,
  deleteOrder, 
  postOrder,
  getRandomDish,
 fetchDrinkById,
}
