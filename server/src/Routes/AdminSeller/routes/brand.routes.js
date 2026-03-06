import express from "express";
import { getBrandListing } from "../../../Controllers/AdminSeller/brand.controller.js";

const brandRoutes = express.Router();

brandRoutes.get("/listing", getBrandListing);

export default brandRoutes;
