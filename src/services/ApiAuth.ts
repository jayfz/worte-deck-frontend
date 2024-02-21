import axios from '@/services/axiosDefaults';
import { AppRestResponse, AuthenticatedUser } from '@/types/domainTypes';
import { AxiosResponse } from 'axios';

type GoogleUserLoginDTO = {
  idToken: string;
};

export async function loginWithGoogle(userLogin: GoogleUserLoginDTO) {
  return basePost<GoogleUserLoginDTO, AuthenticatedUser>('/auth/google/login', userLogin);
}

type UserLoginDTO = {
  email: string;
  password: string;
};

export async function loginWithEmailAndPassword(userLogin: UserLoginDTO) {
  return basePost<UserLoginDTO, AuthenticatedUser>('/auth/login', userLogin);
}

async function basePost<TPayload, TResponse>(url: string, payload: TPayload) {
  const { data } = await axios.post<AppRestResponse<TResponse>, AxiosResponse<AppRestResponse<TResponse>>, TPayload>(
    url,
    payload,
  );

  return data.payload;
}
