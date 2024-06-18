import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Order } from "./types";


let nextId = 2;
let orders: Order[] = [
	{
		id: 1,
		email: "gunnsteinnskula@gmail.com",
		date: new Date().toISOString(),
		time: "",
		guests: 0,
		drinks: [
			{
			
				strCategory: "beer",
				strInstructions: "tasty beer",
				idDrink: "some-uuid",
				strDrinkThumb:
					"https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
				strDrink: "Gylltur",
				price: 2500,
				quantity:0,
			},
		],
		dish: {
			idMeal: "53051",
			strCategory: "seafood",
			strInstructions:
				"In a medium saucepan over medium heat, stir together coconut milk, water, ground ginger, ginger root, salt, bay leaf, and rice. Cover, and bring to a boil. Reduce heat, and simmer for 20 to 30 minutes, or until done.\r\n\r\n Step 2\r\nPlace eggs in a saucepan, and cover with cold water. Bring water to a boil, and immediately remove from heat. Cover, and let eggs stand in hot water for 10 to 12 minutes. Remove eggs from hot water, cool, peel and slice in half. Slice cucumber.\r\n\r\n Step 3\r\nMeanwhile, in a large skillet or wok, heat 1 cup vegetable oil over medium-high heat. Stir in peanuts and cook briefly, until lightly browned. Remove peanuts with a slotted spoon and place on paper towels to soak up excess grease. Return skillet to stove. Stir in the contents of one package anchovies; cook briefly, turning, until crisp. Remove with a slotted spoon and place on paper towels. Discard oil. Wipe out skillet.\r\n\r\n Step 4\r\nHeat 2 tablespoons oil in the skillet. Stir in the onion, garlic, and shallots; cook until fragrant, about 1 or 2 minutes. Mix in the chile paste, and cook for 10 minutes, stirring occasionally. If the chile paste is too dry, add a small amount of water. Stir in remaining anchovies; cook for 5 minutes. Stir in salt, sugar, and tamarind juice; simmer until sauce is thick, about 5 minutes.\r\n\r\n Step 5\r\nServe the onion and garlic sauce over the warm rice, and top with peanuts, fried anchovies, cucumbers, and eggs.",
			strMealThumb :
				"https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
			strMeal: "Nasi lemak",
			price: 2500,
			quantity:0,
		},
	},
];

const api: Express = express();
api.use(cors());
api.use(express.json());
api.use(bodyParser.urlencoded({ extended: false }));
const port = 3001;

api.get("/api/orders", (_, res) => {
	console.log("Getting order:", orders);
	return res.json(orders);
});

const isOrder = (body: Order | Record<string, unknown>): body is Order => {
	if (
typeof body.email === "string" &&
body.dish &&
Array.isArray(body.drinks) &&
typeof body.date === "string" &&
typeof body.dish === "object"
	) {
		return true;
	}
	return false;
};

api.post("/api/create-order", (req: Request<Order>, res) => {
	const emailAlreadyTaken = () => {
		if (!req.body.email) {
			return false;
		}
		// Returns true if email exists, and the index is 0 or higher. Returns false if it cannot find the item, resulting in -1
		return orders.findIndex((order) => order.email === req.body.email) >= 0;
	};

	if (!isOrder(req.body)) {
		res.json({
			success: false,
			error: "Must supply all properties of an order",
		});
		return;
	}

	if (emailAlreadyTaken()) {
		res.json({
			success: false,
			error: "Email already reserved",
		});
		return;
	}

	const order: Order = {
		...req.body,
		id: nextId,
	};

	orders.push(order);
	nextId += 1;

	return res.json({
		success: true,
		order,
	});
});

api.put("/api/update-order", (req: Request<Order>, res) => {
	const emailDoesNotExist = () => {
		if (!req.body.email) {
			return false;
		}
		// Returns true if email does not exist, and the index is lower than 0, resulting in -1
		return orders.findIndex((order) => order.email === req.body.email) < 0;
	};

	if (!isOrder(req.body)) {
		res.json({
			success: false,
			error: "Must supply all properties of an order",
		});
		return;
	}

	if (emailDoesNotExist()) {
		res.json({
			success: false,
			error: "Email does not exist, cannot update",
		});
		return;
	}

	// Map over each item, if the item has the same email as the email in the body, update the order with the new order changes
	orders.map((o) => {
		if (o.email === req.body.email) {
			return req.body;
		}
		return o;
	});

	return res.json({
		success: true,
		order: req.body,
	});
});

api.get("/api/order/:email", (req, res) => {
	const order = orders.find((order) => order.email === req.params.email);
	if (order) {
		return res.json(order);
	}

	res.json({
		success: false,
		error: `Could not find order with email: ${req.params.email}`,
	});
});

api.delete("/api/order/:id", (req, res) => {
	const orderId = parseInt(req.params.id, 10);
	const order = orders.find((e) => e.id === orderId);
	if (order) {
		orders = orders.filter((e) => e.id !== orderId);
		res.json({
			success: true,
			deletedorder: order,
		});
	} else {
		res.json({
			success: false,
			error: `Could not find order with id=${orderId}`,
		});
	}
});

api.delete("/api/order/:email", (req, res) => {
	const paramEmail = req.params.email;
	const order = orders.find((e) => e.email === paramEmail);
	if (order) {
		orders = orders.filter((e) => e.email !== paramEmail);
		res.json({
			success: true,
			deletedorder: order,
		});
	} else {
		res.json({
			success: false,
			error: `Could not find order with id=${paramEmail}`,
		});
	}
});

api.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
