import express from "express";
import { getBrandListing } from "../../../Controllers/AdminSeller/brand.controller.js";
import pagination from "../../../Middlewares/Filters/reusable/pagination.js";
import sortingFilters from "../../../Middlewares/Filters/reusable/sorting.filters.js";

const brandRoutes = express.Router();

brandRoutes.get("/listing", getBrandListing);

export default brandRoutes;
