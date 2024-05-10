export interface IRoute {
  title: string;
  path: string;
}

export const PublicRoutes: IRoute[] = [
  {
    title: 'Home',
    path: '/'
  },
];

export const PrivateRoutes: IRoute[] = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Tracker',
    path: '/tracker'
  },
  {
    title: 'Advertisement',
    path: '/advertisement'
  }
];