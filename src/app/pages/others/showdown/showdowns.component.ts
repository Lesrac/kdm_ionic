import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { KDMDBService } from '../../../service/kdm-db.service';
import { KDMDataService } from '../../../service/kdm-data.service';
import { Monster } from '../../../model/monster';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-showdowns', templateUrl: 'showdowns.component.html',
})
export class ShowdownsPageComponent implements OnInit {

  showdownMonsters: Monster[] = [];

  constructor(public router: Router, public params: NavParams, private kdmdbService: KDMDBService, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getMonsters().then(monsters => this.showdownMonsters = monsters.sort(this.kdmService.sortByName));
  }

  goToDetail(monster: Monster): void {
    this.router.navigate(['/showdown', {
      monster: monster,
    }]).then();
  }

}
