import  express  from "express";
import { getAllAvailableCity } from "../controller/city.controller";

const router = express.Router();

router.route("/").get(getAllAvailableCity);

export default router;