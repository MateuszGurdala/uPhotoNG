import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'u-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isExtended: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  extend()
  {
    this.isExtended = !this.isExtended;
  }

}
