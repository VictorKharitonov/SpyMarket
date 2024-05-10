export interface ISelectors {
  title: string;
  description: string;
  city: string;
  price: string;
}

export interface IPageParse extends Partial<Omit<ISelectors, 'title'>> {
  title: {
    text: string | undefined;
    url: string;
  }
}