import { Component, inject, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-base',
  template: '',
  styles: [],
})
export default class AppPageBase implements OnInit {
  private titleService: Title;
  constructor() {
    this.titleService = inject<Title>(Title);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
