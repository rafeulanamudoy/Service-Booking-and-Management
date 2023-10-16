import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../config';
import { ENUM_USER_ROLE } from '../../enums/user';
import ApiError from '../../errors/ApiError';

const roleBaseAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credential = req.body;

      if (
        credential.role === ENUM_USER_ROLE.SUPER_ADMIN &&
        credential.superRoleKey !== config.super_admin
      ) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'you are not allowed to create super admin Account'
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default roleBaseAuth;
