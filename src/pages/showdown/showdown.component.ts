import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from 'ionic-angular';
import { KDMDBService } from '../../service/kdm_db.service';
import { KDMDataService } from '../../service/kdm_data.service';
import { Monster } from '../../model/monster';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-showdown',
  templateUrl: 'showdown.component.html',
})
export class ShowdownPageComponent implements OnInit {

  monster: Monster;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmdbService: KDMDBService, private kdmService: KDMDataService) {
    this.monster = params.get('monster');
  }

  ngOnInit(): void {

  }

}
