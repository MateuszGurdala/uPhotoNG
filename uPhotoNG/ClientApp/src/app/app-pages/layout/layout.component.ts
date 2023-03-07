import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AccountHttpClientService } from '../../services/account-http-client.service';
import { AppModalComponent } from '../../custom-components/app-modal/app-modal.component';
import ModalService from '../../services/modal-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('appModal') modalRef: AppModalComponent;

  constructor(
    private httpClient: AccountHttpClientService,
    private toastr: ToastrService,
    private router: Router,
    private modal: ModalService
  ) {}

  ngAfterViewInit(): void {
    this.modal.referenceModal(this.modalRef);
  }

  ngOnInit(): void {}

  async signOut() {
    let response = await firstValueFrom(this.httpClient.signOut());
    console.log(response);
    if (response) {
      this.toastr.success('Successfully signed out');
    }
    this.router.navigate(['/']);
  }
}
