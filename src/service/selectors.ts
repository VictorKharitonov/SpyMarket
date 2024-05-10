import { ISelectors } from '@/service/type';

export const SELECTORS: Record<string, ISelectors> = {
  'bamper.by': {
    title: '.add-title > a',
    description: '.info-row > div:not([style])',
    city: '.info-row > .city',
    price: 'h2.item-price > span'
  }
};
