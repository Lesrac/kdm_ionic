import { NavController, PopoverController, ModalController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { KDMDataService } from '../../service/kdm_data.service';
import { CreateSettlementPopoverComponent } from '../popover/create_settlement_popover.component';
import { InnovationTag } from '../../model/innovation';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { SettlementMilestone } from '../../model/linking/settlement_milestone';
import { KDMObserverService } from '../../service/kdm_observer.service';
/**
 * Created by Daniel on 27.01.2017.
 */

@Component({
  selector: 'kdmf-page-settlements',
  templateUrl: 'settlements.component.html',
})
export class SettlementsPageComponent implements OnInit {
  settlements: Settlement[] = [];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController,
              private alertCtrl: AlertController, private kdmService: KDMDataService) {
  }

  presentPopover() {
    let settlement: Settlement = new Settlement('');
    let popover = this.popoverCtrl.create(CreateSettlementPopoverComponent, {
      se: settlement,
    });
    popover.present().then(x => this.settlements.push(settlement));
  }

  addSettlement(): void {
    this.kdmService.addSettlement(this.createDefaultSettlement());
  }

  ngOnInit(): void {
    this.kdmService.getSettlements().then(settlements => this.settlements = settlements);
  }

  goToDetail(settlement: Settlement): void {
    this.navCtrl.push(SettlementPageComponent, {
      settlement,
    }).then();
  }

  removeSettlement(settlement: Settlement): void {
    const alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Do you want to delete ' + settlement.name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.settlements.splice(this.settlements.indexOf(settlement), 1);
          },
        },
      ],
    });
    alert.present();
  }

  private createDefaultSettlement(): Settlement {
    // TODO probably export settlement creation to wizard or something similar
    let settlement: Settlement = new Settlement('New Settlement');
    this.createDefaultTimeline(settlement);
    this.createDefaultNemesisMonsters(settlement);
    this.createDefaultMilestoneStoryEvents(settlement);
    this.createDefaultQuarries(settlement);
    this.createDefaultSettlementLocations(settlement);
    this.createDefaultInnovations(settlement);
    return settlement;
  }

  private createDefaultTimeline(settlement: Settlement): void {
    this.kdmService.getDefaultTimeline().then(timelines => {
      timelines.forEach(timeline => {
        settlement.timeline.push(new SettlementTimeline(settlement, timeline));
      });
    });
  }

  private createDefaultNemesisMonsters(settlement: Settlement): void {
    this.kdmService.getNemesisMonsters().then(nemesisMonsters => settlement.nemesisMonsters = nemesisMonsters);
  }

  private createDefaultMilestoneStoryEvents(settlement: Settlement): void {
    this.kdmService.getMilestones().then(
      milestones => milestones.forEach(
        milestone => settlement.milestones.push(new SettlementMilestone(settlement, milestone))));
  }

  private createDefaultQuarries(settlement: Settlement): void {
    this.kdmService.getQuarries().then(quarries => settlement.quarries = quarries);
  }

  private createDefaultSettlementLocations(settlement: Settlement): void {
    this.kdmService.getSettlementLocations().then(locations =>
      settlement.locations = locations.filter(location => location.isStartLocation));
  }

  private createDefaultInnovations(settlement: Settlement): void {
    this.kdmService.getInnovations().then(innovations =>
      settlement.innovations = innovations.filter(innovation =>
      innovation.tags.indexOf(InnovationTag.STARTING_INNOVATION) > -1),
    );
  }
}
