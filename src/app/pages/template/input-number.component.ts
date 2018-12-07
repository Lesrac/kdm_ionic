import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Created by Daniel on 15.03.2017.
 */
@Component({
  selector: 'kdmf-input-number',
  templateUrl: 'input-number.component.html',
})
export class InputNumberComponent {
  @Input()
  value: number;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

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

}
