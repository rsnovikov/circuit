export interface ILoginRequestBody {
  email: string;
  password: string;
}

export interface ILoginRequestResponse {
  accessToken: string;
  userId: string;
  email: string;
}
