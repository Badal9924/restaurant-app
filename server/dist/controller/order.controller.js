"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.createCheckOutSession = exports.getOrders = void 0;
const OrderModel_1 = require("../models/OrderModel");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const getOrders = async (req, res) => {
    try {
        const order = await OrderModel_1.OrderModel.find({ user: req.id })
            .populate("user")
            .populate("cartItems.restaurantId");
        return res.status(200).json({
            success: true,
            order,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server error",
            success: true,
            error: false,
        });
    }
};
exports.getOrders = getOrders;
const createCheckOutSession = async (req, res) => {
    try {
        const { cartItems, deliveryDetails, totalAmount } = req.body;
        const userId = req?.id;
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Cart Items is empty ",
            });
        }
        const line_items = cartItems.map((eachCartItem) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: eachCartItem.name,
                        images: [eachCartItem.image],
                    },
                    unit_amount: Math.round(+eachCartItem.price * 100),
                },
                quantity: eachCartItem.quantity,
            };
        });
        const newOrder = new OrderModel_1.OrderModel({
            user: userId,
            deliveryDetails,
            cartItems,
            totalAmount,
            paymentStatus: "Pending",
            status: "Pending",
        });
        const savedOrder = await newOrder.save();
        const session = await stripe?.checkout?.sessions?.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["GB", "US", "CA", "IN"],
            },
            line_items,
            mode: "payment",
            success_url: `${process.env.FRONTED_URL}/order/status`,
            cancel_url: `${process.env.FRONTED_URL}/cart`,
            metadata: {
                orderId: savedOrder._id.toString(),
            },
        });
        if (!session.url) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Error while creating session...",
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            sessionId: session.id,
            url: session.url,
            orderId: savedOrder._id,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server error",
            success: false,
            error: true,
        });
    }
};
exports.createCheckOutSession = createCheckOutSession;
const stripeWebhook = async (req, res) => {
    let event;
    try {
        const signature = req.headers["stripe-signature"];
        // Construct the payload string for verification
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
        // Generate test header string for event construction
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });
        // Construct the event using the payload string and header
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    }
    catch (error) {
        console.error("Webhook error:", error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }
    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        try {
            const session = event.data.object;
            const order = await OrderModel_1.OrderModel.findById(session.metadata?.orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            // Update the order with the amount and status
            if (session.amount_total) {
                order.totalAmount = session.amount_total;
            }
            order.paymentStatus = "Paid";
            await order.save();
        }
        catch (error) {
            console.error("Error handling event:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    // Send a 200 response to acknowledge receipt of the event
    res.status(200).send();
};
exports.stripeWebhook = stripeWebhook;
