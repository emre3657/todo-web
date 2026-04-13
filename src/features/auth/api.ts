import { apiClient } from '@/lib/api-client';
import type {
  AuthLoginInput,
  AuthRegisterInput,
  RegisterResponse,
  LoginResponse,
  RefreshResponse,
  LogoutResponse,
  LogoutAllResponse,
} from './types';

export const authApi = {
  login: (data: AuthLoginInput): Promise<LoginResponse> =>
    apiClient.post('/auth/login', data),

  register: (data: AuthRegisterInput): Promise<RegisterResponse> =>
    apiClient.post('/auth/register', data),

  refresh: (): Promise<RefreshResponse> =>
    apiClient.post('/auth/refresh', {}),

  logout: (): Promise<LogoutResponse> => 
    apiClient.post('/auth/logout', {}),

  logoutAll: (): Promise<LogoutAllResponse> => 
    apiClient.post('/auth/logout-all', {}),
};
