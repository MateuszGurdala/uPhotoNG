import { Injectable } from '@angular/core';
import { FileHttpData } from './interfaces';

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

  async getHTTPFile(file: File): Promise<FileHttpData> {
    let fileData: FileHttpData = {} as FileHttpData;
    let reader = new FileReader();
    reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
      if (
        event.target != null &&
        event.target.result !== null &&
        typeof event.target.result !== 'string'
      ) {
        fileData.base64 = this._arrayBufferToBase64(event.target.result);
        fileData.MIMEType = file.type as 'image/jpeg' | 'image/png';
        fileData.fileName = file.name;
        fileData.size = file.size;
        fileData.date = file.lastModified;
      }
    });
    reader.readAsArrayBuffer(file);
    return fileData;
  }

  private _arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary: string = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
