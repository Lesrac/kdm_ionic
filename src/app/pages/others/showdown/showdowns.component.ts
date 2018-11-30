import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { KDMDBService } from '../../../service/kdm-db.service';
import { KDMDataService } from '../../../service/kdm-data.service';
import { Monster } from '../../../model/monster';
import { ShowdownPageComponent } from './showdown.component';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-showdowns',
  templateUrl: 'showdowns.component.html',
})
export class ShowdownsPageComponent implements OnInit {

  showdownMonsters: Monster[] = [];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmdbService: KDMDBService, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getMonsters().then(monsters => this.showdownMonsters = monsters.sort(this.kdmService.sortByName));
  }

  goToDetail(monster: Monster): void {
    this.navCtrl.push(ShowdownPageComponent, {
      monster: monster,
    }).then();
  }

}
