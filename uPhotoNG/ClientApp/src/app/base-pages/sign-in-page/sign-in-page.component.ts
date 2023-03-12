import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AccountHttpClientService } from '../../services/account-http-client.service';
import ToolBox from '../../services/tool-box.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent {
  isProcessing: boolean = false;
  login: string = '';
  password: string = '';
  loginEmpty: boolean = false;
  passwordEmpty: boolean = false;

  constructor(
    private titleSrv: Title,
    private toastr: ToastrService,
    private toolBox: ToolBox,
    private httpClient: AccountHttpClientService,
    private router: Router
  ) {
    this.httpClient.validateAuthentication().subscribe((next) => {
      if (next) {
        this.router.navigate(['/App/Homepage']);
      }
    });
    this.titleSrv.setTitle('Sign in');
  }

  otherSignIn() {
    this.toastr.error('This option is not yet available', 'Whoops');
  }

  async onSubmit() {
    this.isProcessing = true;

    this.verifyInput();

    if (this.loginEmpty || this.passwordEmpty) {
      this.toastr.error('Please enter correct values');
    } else {
      let signInObs = this.httpClient.signIn(this.login, this.password);
      let response = await firstValueFrom(signInObs);

      if (!response) {
        this.toastr.error('Invalid credentials');
        this.loginEmpty = true;
        this.passwordEmpty = true;
      } else {
        this.toastr.success('Successfully signed in', 'Success!');
        this.router.navigate(['/App/Homepage']);
      }
    }
    this.isProcessing = false;
  }

  verifyInput() {
    this.login = this.toolBox.removeWhiteSpaces(this.login);
    this.password = this.toolBox.removeWhiteSpaces(this.password);

    this.loginEmpty = this.toolBox.ifStrEmpty(this.login);
    this.passwordEmpty = this.toolBox.ifStrEmpty(this.password);
  }
}
