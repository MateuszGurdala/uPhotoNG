import { Component, OnInit } from '@angular/core';
import ModalService from '../../services/modal-service.service';

@Component({
  selector: 'u-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isExtended: boolean = false;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {}

  extend() {
    this.isExtended = !this.isExtended;
  }

  retract()
  {
    this.isExtended = false;
  }

  showModal() {
    this.retract();
    this.modal.showModal();
  }
}
