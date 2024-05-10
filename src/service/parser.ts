import { IPageParse, ISelectors } from '@/service/type';
const jsdom = require('jsdom');

export default class ParserService {
  private readonly selectors: ISelectors;

  constructor(selectors: ISelectors) {
    this.selectors = selectors;
  }

  private formatToText(item: HTMLElement) {
    return item.textContent?.replace(/\s{2,}|\t/g, '');
  }

  private formatToLink = (item: HTMLAnchorElement) => {
    const text = this.formatToText(item);
    const url = item.href;

    return { text, url };
  };

  public Parse(page: string): IPageParse[] {
    const { JSDOM } = jsdom;
    const DOM = new JSDOM(page);
    const { title, description, city, price } = this.selectors;
    const data: IPageParse[] = [];

    const titles = [...DOM.window.document.querySelectorAll(title)].map(this.formatToLink);
    const descriptions = [...DOM.window.document.querySelectorAll(description)].map(this.formatToText);
    const cities = [...DOM.window.document.querySelectorAll(city)].map(this.formatToText);
    const prices = [...DOM.window.document.querySelectorAll(price)].map(this.formatToText);

    for (let i = 0; i < titles.length; i++) {
      data.push({
        title: titles[i],
        description: descriptions[i],
        city: cities[i],
        price: prices[i]?.trim()
      });
    }

    return data;
  }
}
