import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Created by Daniel on 15.03.2017.
 */
@Component({
  selector: 'kdmf-input-number',
  templateUrl: 'input_number.component.html',
})
export class InputNumberComponent implements OnInit {
  init: boolean = true;

  @Input()
  value: number;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  valueControl: FormControl = new FormControl();

  ngOnInit(): void {
    this.setupControl();
  }

  increaseValue() {
    this.value++;
    this.change.emit(this.value);
  }

  decreaseValue() {
    if (this.value > 0) {
      this.value--;
      this.change.emit(this.value);
    }
  }

  private setupControl(): void {
    this.valueControl.valueChanges.subscribe((value) => {
      // ignore the initial setting of the formControl
      if (!this.init) {
        if (!this.init && typeof value === 'number') {
          this.change.emit(value);
        } else if (typeof value === 'string') {
          this.change.emit(+value);
        }
      } else {
        this.init = false;
      }
    });
  }

}
