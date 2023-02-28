import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class ToolBox {
  constructor() {}

  removeWhiteSpaces(string: string): string {
    return string.replace(/ /g, '');
  }
  ifStrEmpty(string: string): boolean {
    return string === '';
  }
}
