import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ref',
  templateUrl: './app-ref.component.html',
  styleUrls: ['./app-ref.component.css'],
})
export class AppRefComponent implements OnInit {
  @Input('text') headerText: string;
  @Input('wrap') wrapText: boolean = false;
  @Input('routerLink') link: string;
  @Input('icon') icon: string;
  constructor() {}

  ngOnInit(): void {}
}
