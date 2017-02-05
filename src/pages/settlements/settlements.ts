import {NavController, PopoverController} from "ionic-angular";
import {Component, OnInit} from "@angular/core";
import {Settlement} from "../../models/settlement";
import {SettlementPage} from "../settlement/settlement";
import {Timeline} from "../../models/timeline";
import {LanternEvent} from "../../models/lantern_event";
import {KDMService} from "../../services/kdm.service";
import {CreateSettlementPopover} from "../popover/create_settlement_popover";
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
    this.createDefaultTimeline(settlement.timeline, 1);
    this.createDefaultNemesisMonsters(settlement);
    this.createDefaultMilestoneStoryEvents(settlement);
    this.createDefaultQuarries(settlement);
    return settlement;
  }

  private createDefaultTimeline(timeline: Timeline[], id: number): void {
    let timelineYear: Timeline = new Timeline();
    let event: LanternEvent = new LanternEvent();
    switch (id) {
      case 1:
        event.name = "Returning Survivors";
        timelineYear.event = event;
        break;
      case 2:
        event.name = "Endless Screams";
        timelineYear.event = event;
        break;
      case 4:
        event.name = "Nemesis Encounter - Butcher";
        timelineYear.event = event;
        break;
      case 5:
        event.name = "Hands of Heat";
        timelineYear.event = event;
        break;
      case 6:
        event.name = "Armored Strangers";
        timelineYear.event = event;
        break;
      case 7:
        event.name = "Phoenix Feather";
        timelineYear.event = event;
        break;
      case 9:
        event.name = "Nemesis Encounter - King's Man";
        timelineYear.event = event;
        break;
      case 11:
        event.name = "Regal Visit";
        timelineYear.event = event;
        break;
      case 12:
        event.name = "Principle: Conviction";
        timelineYear.event = event;
        break;
      case 16:
        event.name = "Nemesis Encounter";
        timelineYear.event = event;
        break;
      case 19:
        event.name = "Nemesis Encounter";
        timelineYear.event = event;
        break;
      case 20:
        event.name = "Watched";
        timelineYear.event = event;
        break;
      case 23:
        event.name = "Nemesis Encounter - Level 3";
        timelineYear.event = event;
        break;
      case 25:
        event.name = "Nemesis Encounter - Watcher";
        timelineYear.event = event;
        break;
      case 3:
      case 8:
      case 10:
      case 13:
      case 14:
      case 15:
      case 17:
      case 18:
      case 21:
      case 22:
      case 24:
      case 26:
      case 27:
      case 28:
      case 29:
      case 30:
      case 31:
      case 32:
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
        break;
      default:
        return;
    }
    timelineYear.position = id;
    timeline.push(timelineYear);
    this.createDefaultTimeline(timeline, ++id);
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
