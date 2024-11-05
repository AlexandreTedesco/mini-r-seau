import { atom } from 'jotai';

export const authAtom = atom({
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
}); 