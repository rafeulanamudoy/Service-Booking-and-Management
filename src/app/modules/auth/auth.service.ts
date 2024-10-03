import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

import isUserExist from '../../../helpers/isUserExist';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import hashPassword from '../../../helpers/passwordHash';
import isPasswordMatched from '../../../helpers/passwordMatch';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const createUser = async (user: User): Promise<User | null> => {
  const modifyUser = await hashPassword(user);

  const result = await prisma.user.create({
    data: modifyUser,
  });
  return result;
};
const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  const userExist = await isUserExist(email);

  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Doesn,t Exist');
  }

  if (
    userExist.password &&
    !(await isPasswordMatched(password, userExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  const { id: userId, role } = userExist;

  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    token,
    refreshToken,
    email,
    role,
  };
};
const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

const getUserbyEmail = async (email: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      bookingList: true,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  getUserbyEmail,
  updateUser,
  deleteUser,
};
