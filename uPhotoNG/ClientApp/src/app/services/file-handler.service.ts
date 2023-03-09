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

  _arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary: string = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
