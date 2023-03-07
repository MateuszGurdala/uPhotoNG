import { Injectable } from '@angular/core';
import { AppModalComponent } from '../custom-components/app-modal/app-modal.component';

@Injectable()
export default class ModalService {
  modal: AppModalComponent;
  constructor() {}

  referenceModal(modal: AppModalComponent) {
    this.modal = modal;
  }

  showModal() {
    this.modal.isExtended = !this.modal.isExtended;
  }
}
