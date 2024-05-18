import { useEffect, useState } from "react";

type Dish = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

const getRandomDish = async (): Promise<Dish> => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  const response = await res.json();
  return response.meals[0];
};

const RandomDish = () => {
  const [dish, setDish] = useState<Dish | null>(null);

  const fetchDish = async () => {
    try {
      const fetchedDish = await getRandomDish();
      setDish(fetchedDish);
    } catch (error) {
      console.log("Error fetching dish:", error);
    }
  };

  useEffect(() => {
    fetchDish();
  }, []);

  useEffect(() => {
    console.log("current dish:", dish);
  }, [dish]);

  if (!dish) {
    return <p>Loading...</p>;
  }

  const ScrollableComponent = () => {
    return (
      <div
        style={{
          height: "200px",
          overflow: "scroll",
        }}
      >
        <div className="border-green-950 border-2 border-spacing-x-1 bg-black bg-opacity-75">
          {dish.strInstructions}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <p>{dish.strMeal}</p>
        <img
          src={dish.strMealThumb}
          alt="random dish"
          className="border-double border-4 border-green-950"
        ></img>
        <ScrollableComponent />
      </div>
    </>
  );
};
export default RandomDish;
