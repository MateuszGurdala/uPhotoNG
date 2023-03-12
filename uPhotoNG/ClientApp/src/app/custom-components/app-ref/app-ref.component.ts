import { Component, Host, HostListener, Input } from '@angular/core';
import { AppModalComponent } from '../app-modal/app-modal.component';

@Component({
  selector: 'app-ref',
  templateUrl: './app-ref.component.html',
  styleUrls: ['./app-ref.component.css'],
})
export class AppRefComponent {
  @Input('text') headerText: string;
  @Input('wrap') wrapText: boolean = false;
  @Input('routerLink') link: string;
  @Input('icon') icon: string;

  @HostListener('click', [])
  onClick() {
    this.parent.isExtended = false;
  }

  constructor(@Host() private parent: AppModalComponent) {}
}
