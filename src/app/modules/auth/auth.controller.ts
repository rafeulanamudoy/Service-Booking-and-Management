import httpStatus from 'http-status';

import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unused-vars
  const { superRoleKey, ...user } = req.body;
  console.log(user);

  const result = await AuthService.createUser(user);
  // eslint-disable-next-line no-unused-vars
  if (result !== null) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...others } = result;
    console.log(result);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'User created successfully',
      data: others,
    });
  }
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  if (result !== null) {
    const { refreshToken, ...others } = result;

    // console.log(token, 'from controller');
    // console.log(result, 'to check result');

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User sign in successfully!',
      data: others,
    });
  }
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log('my cookies', req.cookies);
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'New access token generated successfully !',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users retrieved successfully',
    data: data,
  });
});

const getUserbyEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const data = await AuthService.getUserbyEmail(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'User get  successfully',
    data: data,
  });
});
export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  getUserbyEmail,
};
