import { Component } from '@angular/core';
import ModalService from '../../services/modal-service.service';

@Component({
  selector: 'u-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isExtended: boolean = false;

  constructor(private modal: ModalService) {}

  extend() {
    this.isExtended = !this.isExtended;
  }

  retract() {
    this.isExtended = false;
  }

  showModal() {
    this.retract();
    this.modal.showModal();
  }
}
