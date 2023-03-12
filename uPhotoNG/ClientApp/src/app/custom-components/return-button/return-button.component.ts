import { Component, Input } from '@angular/core';

@Component({
  selector: 'return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.css'],
})
export class ReturnButtonComponent {
  @Input('routerLink') routerLink: string;
  constructor() {}
}
