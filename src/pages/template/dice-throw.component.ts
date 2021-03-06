import { Component, Input } from '@angular/core';
import { DiceThrow } from '../../model/dice-throw';

/**
 * Created by Daniel on 16.10.2017.
 */
@Component({
  selector: 'kdmf-dice-throw',
  templateUrl: 'dice-throw.component.html',
})
export class DiceThrowComponent {
  @Input()
  value: DiceThrow;
}
