import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AccountHttpClientService } from '../services/account-http-client.service';
import { Conditions, RegisterData } from '../services/interfaces';
import ToolBox from '../services/tool-box.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent implements OnInit {
  registerData: RegisterData = {
    login: '',
    email: '',
    password: '',
    confirmation: '',
  };
  cond: Conditions = {} as Conditions;
  isProcessing: boolean = false;

  constructor(
    private titleSrv: Title,
    private toolbox: ToolBox,
    private toastr: ToastrService,
    private httpClient: AccountHttpClientService,
    private router: Router
  ) {
    this.titleSrv.setTitle('Sign up');
    this.resetConditions();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isProcessing = true;
    console.log('Processing request...');

    this.validateData().then(() => {
      console.log(this.cond);
      if (Object.values(this.cond).includes(false)) {
        this.toastr.error('Please enter correct values');
        this.isProcessing = false;
      } else {
        this.toastr.success(
          'Your request is currently being processed',
          'Success!'
        );

        this.httpClient
          .createUserAccount(this.registerData)
          .subscribe(async (next) => {
            this.isProcessing = false;
            if (!next) {
              this.toastr.error(
                'Internal server error. Please try again another time.'
              );
            } else {
              this.router.navigate(['/SignIn']);
            }
          });
      }
    });
  }
  async validateData() {
    this.checkPwdUppercase();
    this.resetConditions();
    this.removeWhiteSpaces();
    this.checkIfEmpty();
    this.checkPwdLen();
    this.checkPwdNum();
    this.checkPwdUppercase();
    this.checkPwdEqConf();
    await this.checkLoginEmailAvailable();
  }
  removeWhiteSpaces() {
    for (const [key, value] of Object.entries(this.registerData)) {
      this.registerData[key as keyof RegisterData] =
        this.toolbox.removeWhiteSpaces(value);
    }
  }
  checkIfEmpty() {
    //No empty inputs
    for (const [key, value] of Object.entries(this.registerData)) {
      if (this.toolbox.ifStrEmpty(value)) {
        this.cond[(key + 'Filled') as keyof Conditions] = false;
        this.cond.allFilled = false;
      }
    }
  }
  checkPwdLen() {
    //Length at least 8
    if (!this.toolbox.strLongerThan(this.registerData.password, 7)) {
      this.cond.passwordValid = false;
      this.cond.lengthValid = false;
      this.cond.passwordFilled = false;
      this.cond.confirmationFilled = false;
    }
  }
  checkPwdNum() {
    //Contains number
    if (!this.toolbox.strContainsNum(this.registerData.password)) {
      this.cond.passwordValid = false;
      this.cond.containsNumber = false;
      this.cond.passwordFilled = false;
      this.cond.confirmationFilled = false;
    }
  }
  checkPwdUppercase() {
    //Contains uppercase
    if (!this.toolbox.strContainsUppercase(this.registerData.password)) {
      this.cond.passwordValid = false;
      this.cond.containsUppercase = false;
      this.cond.passwordFilled = false;
      this.cond.confirmationFilled = false;
    }
  }
  checkPwdEqConf() {
    //Passwords are same
    if (!(this.registerData.password === this.registerData.confirmation)) {
      this.cond.passwordValid = false;
      this.cond.areSame = false;
      this.cond.passwordFilled = false;
      this.cond.confirmationFilled = false;
    }
  }
  async checkLoginEmailAvailable() {
    let loginObs = this.httpClient.checkLoginAvailable(this.registerData.login);
    let emailObs = this.httpClient.checkEmailAvailable(this.registerData.email);
    this.cond.loginValid = await firstValueFrom(loginObs, {defaultValue: false});
    this.cond.emailValid = await firstValueFrom(emailObs, {defaultValue: false});
    await new Promise(r => setTimeout(r, 500)); //Necessary
  }
  resetConditions() {
    this.cond = {
      allFilled: true,
      loginFilled: true,
      emailFilled: true,
      passwordFilled: true,
      confirmationFilled: true,
      loginValid: true,
      emailValid: true,
      passwordValid: true,
      containsNumber: true,
      containsUppercase: true,
      lengthValid: true,
      areSame: true,
    };
  }
}
