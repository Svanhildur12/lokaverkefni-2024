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
	strMeal: string;
	strMealThumb: string;
	price: number;
	quantity: number;
  };
  
  export type DrinkType = {
	strDrink: string;
	strDrinkThumb: string;
	price: number;
	quantity: number;
  };
  
  export type OrderType = {
	id: number;
	dish: DishType;
	drink?: DrinkType;
	date: string;
	time: string;
	guests: number;
	email: string;
  };
 
export type Order = {
    id: number;
    email: string;
    dish: Dish;
    drinks: Drink[];
    date: string;
	time: string;
	guests: number;
};