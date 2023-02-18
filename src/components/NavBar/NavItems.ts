export interface NavItems {
  name: string;
  type: string;
  src?: string;
}

export type NavBarUlItems = NavItems[];

export const NavItemsLeft: NavBarUlItems = [
  {
    name: 'logo',
    type: 'logo',
    src: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg',
  },
  { name: 'Movies', type: 'text' },
  { name: 'TV shows', type: 'text' },
  { name: 'People', type: 'text' },
  { name: 'More', type: 'text' },
];
export const NavItemsRight: NavBarUlItems = [
  { name: 'plus', type: 'icon' },
  { name: 'EN', type: 'language' },
  { name: 'Login', type: 'text' },
  { name: 'Join TMDB', type: 'text' },
  { name: 'search', type: 'icon' },
];
