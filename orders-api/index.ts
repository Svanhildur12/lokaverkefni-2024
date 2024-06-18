import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Order } from "./types";


let nextId = 1;
let orders: Order[] = [
	
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
