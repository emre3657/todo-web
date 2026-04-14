const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_URL = API_BASE_URL + '/api/v1';

export interface ApiErrorResponse {
  message: string;
  code: string;
  errors?: Array<{
    field: string
    message: string;
  }>;
}

export class ApiError extends Error {
  response: {
    status: number;
    data: ApiErrorResponse | null;
  };

  constructor(message: string, status: number, data: ApiErrorResponse | null) {
    super(message);
    this.name = 'ApiError';
    this.response = { status, data };
  }
}

class ApiClient {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        ...this.getHeaders(),
        ...(options.headers ?? {}),
      },
      ...options,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new ApiError(data?.message || `HTTP ${response.status} ${response.statusText}`, response.status, data);
    }

    return data;
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
