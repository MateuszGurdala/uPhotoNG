export interface RegisterData {
  login: string;
  email: string;
  password: string;
  confirmation: string;
}

export interface Conditions {
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

export interface FileHttpData {
  fileName: string,
  MIMEType: "image/jpeg" | "image/png",
  size: number,
  album: string,
  place:string
}