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

  strLongerThan(string: string, length: number): boolean {
    return string.length > length;
  }

  strContainsNum(string: string) : boolean {
    return /\d/.test(string);
  }

  strContainsUppercase(string: string) : boolean {
    return string !== string.toLowerCase();
  }
}
