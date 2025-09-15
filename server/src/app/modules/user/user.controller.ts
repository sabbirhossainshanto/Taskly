import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";

const getMe = catchAsync(async (req, res) => {
  const result = await userService.getMe(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Current user retrieved",
    data: result,
  });
});

export const userController = {
  getMe,
};
