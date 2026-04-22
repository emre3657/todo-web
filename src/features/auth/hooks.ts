import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from './api';
import type {
  AuthLoginInput,
  AuthRegisterInput,
  LoginResponse,
  RegisterResponse,
} from './types';
import { apiClient } from '@/lib/api-client';
import { useAuth } from './auth-context';

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  return useMutation<RegisterResponse, Error, AuthRegisterInput>({
    mutationFn: (data) => authApi.register(data),
    onSuccess: (data) => {
      apiClient.setAccessToken(data.accessToken);
      queryClient.setQueryData(['auth-user'], data.user);
      setAuthUser(data.user);
      navigate('/todos');
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  return useMutation<LoginResponse, Error, AuthLoginInput>({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (data) => {
      apiClient.setAccessToken(data.accessToken);
      queryClient.setQueryData(['auth-user'], data.user);
      setAuthUser(data.user);
      navigate('/todos');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      navigate('/login');
    },
  });
};

export const useLogoutAll = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logoutAll(),
    onSuccess: () => {
      clearAuth();
      navigate('/login');
    },
  });
};
