import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AccountHttpClientService } from 'src/app/services/account-http-client.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private httpClient : AccountHttpClientService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {}

  async signOut()
  {
    let response = await firstValueFrom(this.httpClient.signOut());
    console.log(response);
    if(response)
    {
      this.toastr.success('Successfully signed out');
    }
    this.router.navigate(['/']);
  }
}
