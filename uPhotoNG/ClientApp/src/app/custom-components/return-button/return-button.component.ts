import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.css']
})
export class ReturnButtonComponent implements OnInit {
  @Input('routerLink') routerLink: string;
  constructor() { }

  ngOnInit(): void {
  }

}
