export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/api/tracker/:path*', '/api/advertisement/:path*', '/tracker/:path*', '/advertisement/:path*']
};
