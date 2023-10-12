export type IUserExistReturn = {
  id: string;
  role: string;

  password: string;
};
export type ILoginUser = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  refreshToken: string;
  token: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
