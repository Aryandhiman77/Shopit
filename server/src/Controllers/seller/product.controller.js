import AsyncWrapper from "../../Helpers/AsyncWrapper.js";

export const createProductController = AsyncWrapper(async (req, res) => {
//   const { product } = await createProductService(req.data);
    res.send("createing product/")
});
