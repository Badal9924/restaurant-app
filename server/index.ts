import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/connectDB";

import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route"
import orderRoute from "./routes/order.route";
import userRoute from "./routes/userRoutes";
import path from "path";
import cartRouter from "./routes/cart.router";
import cityRouter from "./routes/city.route";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DIRNAME = path.resolve();

// default middleware :)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONTED_URL,
    credentials: true
}
app.use(cors(corsOptions));

connectDB();


// Api routes :)
app.use("/api/v1/user",userRoute);
app.use("/api/v1/restaurant",restaurantRoute);
app.use("/api/v1/menu",menuRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/city",cityRouter);

app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res) => {
    res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});