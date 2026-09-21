import { en } from './en';
import { kn } from './kn';

export type Language = 'en' | 'kn';
export type Translation = typeof en;

export const translations: Record<Language, Translation> = {
  en,
  kn,
};
