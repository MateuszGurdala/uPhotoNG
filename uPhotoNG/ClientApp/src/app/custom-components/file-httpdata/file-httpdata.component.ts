import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileHttpData } from '../../services/interfaces';

@Component({
  selector: 'file-httpdata',
  templateUrl: './file-httpdata.component.html',
  styleUrls: ['./file-httpdata.component.css']
})
export class FileHTTPDataComponent implements OnInit {

  @Input('file') fileData: FileHttpData;

  constructor() { }

  ngOnInit(): void {
  }

}
