import Category from "../../Models/category.js";

const brandFilters = async (req, _, next) => {
  const { categories, search, status, verified } = req.query;
  let query = {};

  if (categories) {
    const CATEGORIES = categories ? categories.split(",") : ["all"];
    let categoriesIds = await Category.find({
      slug: { $in: [...CATEGORIES] },
    })
      .select("_id")
      .lean();
    categoriesIds = categoriesIds?.map((cat) => cat._id);
    query.categories = { $in: [...categoriesIds] };
  }

  if (status) {
    query.isActive = status === "active";
  }
  if (verified) {
    query.isVerified = verified === "true";
  }

  if (search) {
    const SEARCH = new RegExp(search?.toString(), "i");
    query = {
      ...query,
      $or: [{ title: { $regex: SEARCH } }, { description: { $regex: SEARCH } }],
    };
  }

  req.filters = { ...query };
  next();
};
export default brandFilters;
