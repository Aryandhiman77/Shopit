import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import {
  getAllBrandRequests,
  requestBrandToAdmin,
  sendDocsToAdminForVerification,
} from "../../Services/sellerServices/brandServices.js";
import { upload } from "../../Middlewares/multer.js";
import fs from "fs";

export const requestBrand = AsyncWrapper(async (req, res) => {
  const request = await requestBrandToAdmin(req.data, req.file, req.user.id);
  if (request) {
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Brand request created. Upload your documents for verfication."
        )
      );
  }
});

export const getBrandRequests = AsyncWrapper(async (req, res) => {
  const requests = await getAllBrandRequests(req.user.id);
  res
    .status(200)
    .json(new ApiResponse(200, requests, "Requests Fetched successfully."));
});

export const requestDocs = AsyncWrapper(async (req, res, next) => {
  const { reqId } = req.params;
  try {
    const request = await sendDocsToAdminForVerification(
      req.body.docNames,
      req.files,
      reqId,
      req.user.id
    );
    if (request) {
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            null,
            "Your documents will be verified by Admin. Soon, you will get verification update via email."
          )
        );
    }
  } catch (error) {
    req.files.map((file) => fs.unlinkSync(file.path));
    next(error);
  }
});
