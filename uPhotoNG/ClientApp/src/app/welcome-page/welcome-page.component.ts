import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountHttpClientService } from '../services/account-http-client.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    private titleSrv: Title,
    private httpClient: AccountHttpClientService,
    private router: Router
  ) {
    this.httpClient.validateAuthentication().subscribe((next) => {
      if (next) {
        this.router.navigate(['/App/Homepage']);
      }
    });
    this.titleSrv.setTitle('uPhoto');
  }

  ngOnInit(): void {}
}
