import express from 'express';
import { AuthController } from './auth.controller';

import roleBaseAuth from '../../middlewares/roleBaseAuth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

export const AuthRoute = router;
router.patch(
  '/:id',

  AuthController.updateUser
);

router.post(
  '/signUp',
  validateRequest(AuthValidation.signUpZodSchema),
  roleBaseAuth(),
  AuthController.createUser
);

router.post(
  '/signin',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
// router.get('/', UserController.getAllUsers);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.get(
  '/email/:email',

  AuthController.getUserbyEmail
);
