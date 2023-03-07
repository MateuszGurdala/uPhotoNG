import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import ModalService from '../../services/modal-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent implements OnInit {

  isExtended: boolean = true;

  @ViewChild('self') self: ElementRef;
  @HostListener('document:click', ['$event'])
  clicked(event: Event)
  {
    console.log((event.target as HTMLElement).ariaLabel);
    if(!this.self.nativeElement.contains(event.target) && (event.target as HTMLElement).ariaLabel !== "apps outline")
    {
      this.isExtended = false;
    }
  }

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
  }
}
