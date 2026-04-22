import { ApiError } from '@/lib/api-client';

const NETWORK_ERROR_PATTERN =
  /failed to fetch|network request failed|networkerror|request to .* failed/i;

export function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return NETWORK_ERROR_PATTERN.test(error.message);
}

export function getFriendlyErrorMessage(
  error: unknown,
  networkFallback: string,
): string {
  if (error instanceof ApiError) {
    const message = error.response.data?.message?.trim();
    return message || "Something went wrong. Please try again.";
  }

  if (isNetworkError(error)) {
    return networkFallback;
  }

  if (error instanceof Error) {
    const message = error.message.trim();

    if (
      message &&
      !/http \d{3}|unexpected token/i.test(message)
    ) {
      return message;
    }
  }

  return "Something went wrong. Please try again.";
}