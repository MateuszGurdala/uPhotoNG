import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import ModalService from '../../services/modal-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css'],
})
export class AppModalComponent implements OnInit {
  isExtended: boolean = false;

  @ViewChild('self') self: ElementRef;
  @HostListener('document:click', ['$event'])
  clicked(event: Event) {
    console.log();
    let isTargetModal: boolean = this.self.nativeElement.contains(event.target);
    let isTargetAppIcon: boolean =
      (event.target as HTMLElement).ariaLabel === 'apps outline';
    let isTargetAppText: boolean =
      (event.target as HTMLElement).innerText === 'All apps';
    if (!isTargetModal && !isTargetAppIcon && !isTargetAppText) {
      this.isExtended = false;
    }
  }

  constructor(private modal: ModalService) {}

  ngOnInit(): void {}
}
