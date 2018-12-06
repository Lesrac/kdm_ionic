import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-severe-injuries', templateUrl: 'severe-injuries.component.html',
})
export class SevereInjuriesPageComponent {
  text1: string = 'When a survivor suffers a severe injury at a hit location, determine the outcome by rolling 1d10' + ' on the corresponding table.';
  text2: string = 'A survivor with 5 bleeding tokens is dead.';
  text3: string = 'Some permanent injuries have limits to how many times they can be recorded. If a survivor suffers' + ' a severe injury that they have already recorded the maximum number of times, they instead gain 1 bleeding token.';

  constructor(public router: Router) {
  }
}
