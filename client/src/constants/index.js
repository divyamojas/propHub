import { listProperty, dashboard, logout, payment, profile, bidProperty } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'list-property',
    imgUrl: listProperty,
    link: '/list-property',
  },
  {
    name: 'bid-property',
    imgUrl: bidProperty,
    link: '/bid-property',
  },
  {
    name: 'my-activities',
    imgUrl: profile,
    link: '/my-activities',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
  },
];
