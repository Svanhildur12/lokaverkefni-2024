import { useRouter } from "next/navigation";
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

const postRandomDish = async (dish: Dish): Promise<Dish> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    //breyta fetchinu þegar þú ert komin með CART!
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dish),
  });

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  const response = await res.json();
  console.log("posted order", response);
  return response;
};

const RandomDish = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState("");
  const router = useRouter();

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

  const handleAddToCart = async () => {
    if (dish && quantity) {
      await postRandomDish(dish);
      await fetchDish();
      setQuantity("");
    }
  };

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

  const refreshPage = () => {
    fetchDish();
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
        <button
          className="bg-white text-black rounded-sm m-2 w-32"
          type="button"
          onClick={refreshPage}
        >
          Generate new
        </button>
      </div>
      <div className="m-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          <label>
            Quantity
            <input
              className="text-black"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <button type="submit" className="">
            {" "}
            Add To Cart
          </button>
          <div className="mt-2"></div>
          <button
            className="text-white text-xl"
            onClick={() => router.push("/SelectDrink")}
          >
            next page
          </button>
        </form>
      </div>
    </>
  );
};
export default RandomDish;