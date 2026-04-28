import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from './api';
import type {
  AuthLoginInput,
  AuthRegisterInput,
  AuthForgotPasswordInput,
  AuthResetPasswordInput,
  LoginResponse,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
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
  const { clearAuth } = useAuth();

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth('logged-out');
    },
  });
};

export const useLogoutAll = () => {
  const { clearAuth } = useAuth();

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logoutAll(),
    onSuccess: () => {
      clearAuth('logged-out-all');
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, AuthForgotPasswordInput>({
    mutationFn: (data) => authApi.forgotPassword(data),
  });
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, AuthResetPasswordInput>({
    mutationFn: (data) => authApi.resetPassword(data),
  });
};