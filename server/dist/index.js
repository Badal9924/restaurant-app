"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const restaurant_route_1 = __importDefault(require("./routes/restaurant.route"));
const menu_route_1 = __importDefault(require("./routes/menu.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const path_1 = __importDefault(require("path"));
const cart_router_1 = __importDefault(require("./routes/cart.router"));
const city_route_1 = __importDefault(require("./routes/city.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const DIRNAME = path_1.default.resolve();
// default middleware :)
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: process.env.FRONTED_URL,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
(0, connectDB_1.default)();
// Api routes :)
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/restaurant", restaurant_route_1.default);
app.use("/api/v1/menu", menu_route_1.default);
app.use("/api/v1/order", order_route_1.default);
app.use("/api/v1/cart", cart_router_1.default);
app.use("/api/v1/city", city_route_1.default);
app.use(express_1.default.static(path_1.default.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
    res.sendFile(path_1.default.resolve(DIRNAME, "client", "dist", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
