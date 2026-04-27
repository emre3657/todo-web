import { apiClient } from '@/lib/api-client';
import type {
  DeleteMeResponse,
  GetMeResponse,
  UpdateMeResponse,
  UpdatePasswordResponse,
} from './types';
import type {
  UpdatePasswordInput,
  UpdateProfileInput,
} from './schemas';

export const profileApi = {
  getMe: async () => {
    const response = await apiClient.get<GetMeResponse>('/users/me');
    return response.user;
  },

  updateMe: async (data: UpdateProfileInput) => {
    const response = await apiClient.patch<UpdateMeResponse>('/users/me', data);
    return response.user;
  },

  updatePassword: async (data: UpdatePasswordInput) => {
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      repassword: data.repassword,
    };

    const response = await apiClient.patch<UpdatePasswordResponse>(
      '/users/me/password',
      payload,
    );

    return response.user;
  },

  deleteMe: async () => {
    return apiClient.delete<DeleteMeResponse>('/users/me');
  },
};