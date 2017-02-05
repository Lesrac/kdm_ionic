import {NavController, PopoverController} from "ionic-angular";
import {Component, OnInit} from "@angular/core";
import {Settlement} from "../../models/settlement";
import {SettlementPage} from "../settlement/settlement";
import {Timeline} from "../../models/timeline";
import {LanternEvent} from "../../models/lantern_event";
import {KDMService} from "../../services/kdm.service";
import {CreateSettlementPopover} from "../popover/create_settlement_popover";
import {StoryEvent} from "../../models/story_event";
/**
 * Created by Daniel on 27.01.2017.
 */

@Component({
  selector: 'page-settlements',
  templateUrl: 'settlements.html'
})
export class SettlementsPage implements OnInit {
  settlements: Settlement[] = [];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private kdmService: KDMService) {
  }

  presentPopover() {
    let settlement: Settlement = new Settlement('');
    let popover = this.popoverCtrl.create(CreateSettlementPopover, {
      se: settlement
    });
    popover.present().then(x => this.settlements.push(settlement));
  }

  addSettlement(): void {
    this.kdmService.addSettlement(this.createDefaultSettlement());
  }

  ngOnInit(): void {
    this.kdmService.getSettlements().then(settlements => this.settlements = settlements);
  }

  private createDefaultSettlement(): Settlement {
    let settlement: Settlement = new Settlement('New Settlement');
    this.createDefaultTimeline(settlement);
    this.createDefaultNemesisMonsters(settlement);
    this.createDefaultMilestoneStoryEvents(settlement);
    this.createDefaultQuarries(settlement);
    return settlement;
  }

  private createDefaultTimeline(settlement: Settlement): void {
    this.kdmService.getDefaultTimeline().then(timeline => {
      console.log(typeof timeline);
      settlement.timeline = timeline;
    });
  }

  private createDefaultNemesisMonsters(settlement: Settlement): void {
    this.kdmService.getNemesisMonsters().then(nemesisMonsters => settlement.nemesisMonsters = nemesisMonsters);
  }

  private createDefaultMilestoneStoryEvents(settlement: Settlement): void {
    this.kdmService.getEvents().then(lanternEvents => {
      settlement.milestones = lanternEvents.filter(lanternEvent => lanternEvent.isMilestone);
    });
  }

  private createDefaultQuarries(settlement: Settlement): void {
    this.kdmService.getQuarries().then(quarries => settlement.quarries = quarries);
  }

  goToDetail(settlement: Settlement): void {
    this.navCtrl.push(SettlementPage, {
      settlement
    }).then();
  }

  removeSettlement(settlement: Settlement): void {
    this.settlements.splice(this.settlements.indexOf(settlement), 1);
  }
}
