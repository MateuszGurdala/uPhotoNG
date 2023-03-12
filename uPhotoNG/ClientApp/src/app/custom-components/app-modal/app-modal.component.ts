import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css'],
})
export class AppModalComponent {
  @ViewChild('self') self: ElementRef;
  isExtended: boolean = false;
  
  @HostListener('document:click', ['$event']) // NIE TYKAĆ
  clicked(event: Event) {
    let isTargetModal: boolean = this.self.nativeElement.contains(event.target);
    let isTargetAppIcon: boolean =
      (event.target as HTMLElement).ariaLabel === 'apps outline';
    let isTargetAppText: boolean =
      (event.target as HTMLElement).innerText === 'All apps';
    if (!isTargetModal && !isTargetAppIcon && !isTargetAppText) {
      this.isExtended = false;
    }
  }

  constructor() {}
}
