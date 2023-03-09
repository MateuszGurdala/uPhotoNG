import { Injectable } from '@angular/core';

@Injectable()
export default class FileHandler {
  private MIMETypes: string[] = ['image/jpeg', 'image/png'];

  checkMIMETypes(files: FileList): boolean {
    let isOk: boolean = true;
    [...files].forEach((file, i) => {
      if (!this.MIMETypes.includes(file.type)) {
        isOk = false;
      }
    });
    return isOk;
  }
}
