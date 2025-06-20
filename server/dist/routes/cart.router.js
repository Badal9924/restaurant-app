"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const cart_controller_1 = require("../controller/cart.controller");
const router = express_1.default.Router();
router.route("/addtocart").post(isAuthenticated_1.isAuthenticated, cart_controller_1.addToCart);
router.route("/viewcartitems").get(isAuthenticated_1.isAuthenticated, cart_controller_1.viewCartItems);
router.route("/updatecartitems").patch(isAuthenticated_1.isAuthenticated, cart_controller_1.updateCartItems);
router.route("/deleteitemincart").delete(isAuthenticated_1.isAuthenticated, cart_controller_1.deleteCartItems);
exports.default = router;
