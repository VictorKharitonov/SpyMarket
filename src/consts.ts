export const fetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);

  if (!response.ok) {
    const info = await response.text();
    return Promise.reject(JSON.parse(info));
  }

  return response.json();
};

export const unknownError = 'Something went wrong';

export const Authenticated = 'authenticated';
export const Loading = 'loading';
export const Unauthenticated = 'unauthenticated';
