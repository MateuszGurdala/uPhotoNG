import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'u-input',
  templateUrl: './uinput.component.html',
  styleUrls: ['./uinput.component.css'],
})
export class UInputComponent implements OnInit, AfterViewInit {
  @Input('text') text: string;
  @Input('input-type') inputType: string;
  @Input('input-size') inputSize: string;
  @Input('label-size') labelSize: string;
  @Input('valid') isValid: boolean = true;

  @ViewChild('label') labelEl: ElementRef;
  @ViewChild('input') inputEl: ElementRef;

  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  valueChanged() {
    this.value = this.inputEl.nativeElement.value;
    this.valueChange.emit(this.value);
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.labelEl.nativeElement,
      'font-size',
      this.labelSize
    );
    this.renderer.setStyle(
      this.inputEl.nativeElement,
      'font-size',
      this.inputSize
    );
  }
}
