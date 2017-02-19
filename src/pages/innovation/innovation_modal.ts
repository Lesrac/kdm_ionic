import {Component, OnInit} from "@angular/core";
import {Settlement} from "../../model/settlement";
import {ViewController, NavParams} from "ionic-angular";
import {Innovation} from "../../model/innovation";
import {KDMDataService} from "../../service/kdm_data.service";
/**
 * Created by Daniel on 19.02.2017.
 */
@Component({
  selector: 'innovation-modal',
  templateUrl: 'innovation_modal.html'
})
export class InnovationModal implements OnInit {

  settlement: Settlement;
  usableInnovations: Innovation[];
  innovationName: string;

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.settlement = this.params.get('settlement');
  }

  ngOnInit(): void {
    this.setupUsableInnovations();
  }

  private setupUsableInnovations(): void {
    //TODO Innovations depending on SettlementInnovations
    this.kdmData.getInnovations().then(innovations => this.usableInnovations = innovations);
  }

  addClose(): void {
    const innovation: Innovation = this.usableInnovations.find(item => item.name == this.innovationName);
    if (innovation) {
      this.settlement.innovations.push(innovation);
    }
    this.close();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }
}
