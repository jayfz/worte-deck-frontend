export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthenticatedUser = {
  user: User;
  token: string;
  expirationDate: string;
};

export type AppRestResponse<T> = {
  outcome: 'success' | 'fail';
  payload: T;
};

type ResponsePage = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  number: number;
  order: 'string';
};

export type PagedAppRestResponse<T> = AppRestResponse<T> & {
  page: ResponsePage;
};
