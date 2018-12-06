import { Component, OnInit } from '@angular/core';
import { KDMDataService } from '../../../service/kdm-data.service';
import { Monster } from '../../../model/monster';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-showdowns', templateUrl: 'showdowns.component.html',
})
export class ShowdownsPageComponent implements OnInit {

  showdownMonsters: Monster[] = [];

  constructor(public kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getMonsters().then(monsters => this.showdownMonsters = monsters.sort(this.kdmService.sortByName));
  }

}
