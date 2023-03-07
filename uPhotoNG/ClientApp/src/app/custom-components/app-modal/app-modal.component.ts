import { Component, OnInit } from '@angular/core';
import ModalService from '../../services/modal-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent implements OnInit {

  isExtended: boolean = true;

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
  }

}
