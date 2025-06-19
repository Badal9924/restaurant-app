import  express  from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { addToCart, deleteCartItems, updateCartItems, viewCartItems } from "../controller/cart.controller";

const router = express.Router();

router.route("/addtocart").post(isAuthenticated,addToCart);
router.route("/viewcartitems").get(isAuthenticated,viewCartItems);
router.route("/updatecartitems").patch(isAuthenticated,updateCartItems);
router.route("/deleteitemincart").delete(isAuthenticated,deleteCartItems);

export default router;