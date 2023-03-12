import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DatabaseOption } from 'src/app/services/interfaces';

@Component({
  selector: 'u-select',
  templateUrl: './uselect.component.html',
  styleUrls: ['./uselect.component.css'],
})
export class USelectComponent implements AfterViewInit {
  @Input('text') text: string;
  @Input('input-size') inputSize: string;
  @Input('label-size') labelSize: string;
  @Input('data') data: DatabaseOption[];

  @ViewChild('label') labelEl: ElementRef;
  @ViewChild('select') selectEl: ElementRef;
  @ViewChild('option') optionEl: ElementRef;

  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  valueChanged() {
    this.value = this.selectEl.nativeElement.value;
    this.valueChange.emit(this.value);
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.labelEl.nativeElement,
      'font-size',
      this.labelSize
    );
    this.renderer.setStyle(
      this.selectEl.nativeElement,
      'font-size',
      this.inputSize
    );
    this.renderer.setStyle(
      this.optionEl.nativeElement,
      'font-size',
      this.inputSize
    );
    this.renderer.setStyle(
      this.selectEl.nativeElement,
      'margin-top',
      (this.inputSize[0] as unknown as number) / 4 + 'vh'
    );
  }
}
