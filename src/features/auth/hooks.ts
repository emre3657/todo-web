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

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<RegisterResponse, Error, AuthRegisterInput>({
    mutationFn: (data) => authApi.register(data),
    onSuccess: (data) => {
      apiClient.setAccessToken(data.accessToken);
      queryClient.setQueryData(['auth-user'], data.user);
      navigate('/todos');
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, AuthLoginInput>({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (data) => {
      apiClient.setAccessToken(data.accessToken);
      queryClient.setQueryData(['auth-user'], data.user);
      navigate('/todos');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      apiClient.setAccessToken(null);
      queryClient.clear();
      navigate('/login');
    },
  });
};

export const useLogoutAll = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logoutAll(),
    onSuccess: () => {
      apiClient.setAccessToken(null);
      queryClient.clear();
      navigate('/login');
    },
  });
};
