export interface IAuthRequestBody {
  email: string;
  password: string;
}

export interface IAuthRequestResponse {
  accessToken: string;
  userId: string;
  email: string;
}
