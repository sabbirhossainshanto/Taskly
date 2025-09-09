import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerMember = catchAsync(async (req, res) => {
  const result = await authService.resisterMember(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Registered successful",
    data: result,
  });
});

export const authController = {
  registerMember,
};
