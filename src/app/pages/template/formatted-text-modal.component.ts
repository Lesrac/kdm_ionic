import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

/**
 * Created by Daniel on 09.11.2017.
 */

@Component({
  selector: 'kdmf-formatted-text',
  templateUrl: 'formatted-text-modal.component.html',
})
export class FormattedTextModalComponent {

  title: string;
  text: string;

  constructor(public params: NavParams) {
    this.title = params.get('title');
    this.text = params.get('text');
  }

  close(): void {
  }

}
