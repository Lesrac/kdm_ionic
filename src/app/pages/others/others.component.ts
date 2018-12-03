import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kdmf-page-others', templateUrl: 'others.component.html',
})
export class OthersPageComponent {

  constructor(public router: Router) {
  }

  goToDetail(otherElement: string): void {
    console.log('switch: ' + otherElement);
    switch (otherElement) {
      case 'braintrauma':
        this.router.navigate(['/brainTrauma']).then();
        break;
      case 'glossary':
        this.router.navigate(['kdm', {outlets: {others: ['glossary']}}]).then();
        break;
      case 'hunteventtable':
        this.router.navigate(['kdm', {outlets: {others: ['huntEvents']}}]).then();
        // this.router.navigate(['/huntEvents']).then();
        break;
      case 'severeinjuries':
        this.router.navigate(['/severeInjuries']).then();
        break;
      case 'storyevents':
        this.router.navigate(['/storyEvents']).then();
        break;
      case 'showdowns':
        this.router.navigate(['/showdowns']).then();
        break;
      default:
        console.log('no view defined for: ', otherElement);
    }
  }
}
