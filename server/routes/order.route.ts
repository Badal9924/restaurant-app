import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckOutSession,
  getOrders,
  stripeWebhook,
} from "../controller/order.controller";
const router = express.Router();

router.route("/").get(isAuthenticated, getOrders);

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckOutSession);

  router.route("/webhook").post(express.json({type: 'application/json'}),stripeWebhook);

export default router;