import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchasync from "../../../shared/catchAsync";
import { AuthService } from "./auth.server";
import httpStatus from "http-status";


const registerUser: RequestHandler = catchasync(
    async (req: Request, res: Response) => {
      const result = await AuthService.registerUser(req.body)
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user registerd successfully!',
        data: result,
      });
    }
  );
const loginUser: RequestHandler = catchasync(
    async (req: Request, res: Response) => {
      const result = await AuthService.loginUser(req.body)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user logged-in successfully!',
        data: result,
      });
    }
  );

  export const AuthController = {
    registerUser,
    loginUser
  }