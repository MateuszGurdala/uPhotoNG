import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-base',
  template: '',
  styles: [],
})
export default class AppPageBase {
  private titleService: Title;
  constructor() {
    this.titleService = inject<Title>(Title);
  }
  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
