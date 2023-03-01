import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import ToolBox from '../services/tool-box.service';

interface RegisterData {
  login: string;
  email: string;
  password: string;
  confirmation: string;
}

interface Conditions {
  allFilled: boolean;
  loginFilled: boolean;
  emailFilled: boolean;
  passwordFilled: boolean;
  confirmationFilled: boolean;
  loginValid: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  containsNumber: boolean;
  containsUppercase: boolean;
  lengthValid: boolean;
  areSame: boolean;
}

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
    private toastr: ToastrService
  ) {
    this.titleSrv.setTitle('Sign up');
    this.resetConditions();
  }

  ngOnInit(): void {}

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

  onSubmit() {
    this.resetConditions();
    this.removeWhiteSpaces();
    this.checkIfEmpty();
    this.checkPwdLen();
    this.checkPwdNum();
    this.checkPwdUppercase();
    this.checkPwdEqConf();

    //Verify login and email are unused
    //TODO
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
}
