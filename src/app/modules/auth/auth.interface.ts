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
  email: string;
  role: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
