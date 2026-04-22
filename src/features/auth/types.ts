import type { RegisterInput, LoginInput } from './schemas';

export interface User {
  id: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}


export type RegisterResponse = AuthResponse;
export type LoginResponse = AuthResponse;
export type RefreshResponse = AuthResponse;
export type LogoutResponse = void;
export type LogoutAllResponse = void;

export type AuthRegisterInput = RegisterInput;
export type AuthLoginInput = LoginInput;
