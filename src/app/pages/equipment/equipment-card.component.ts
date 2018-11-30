import { Component, DoCheck, Input, KeyValueDiffers, OnInit } from '@angular/core';
import { Survivor } from '../../model/survivor';
import { Settlement } from '../../model/settlement';
import { Affinity, Direction, Equipment } from '../../model/equipment';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 06.01.2018.
 */
@Component({
  selector: 'kdmf-equipment-card', templateUrl: 'equipment-card.component.html',
})
export class EquipmentCardComponent implements OnInit, DoCheck {
  @Input() survivor: Survivor;

  @Input() position: number;

  @Input() settlement: Settlement;

  backgroundUp;

  backgroundLeft;
  backgroundRight;
  backgroundDown;
  differ;

  constructor(public router: Router, public differs: KeyValueDiffers) {
    this.differ = differs.find({}).create();
  }

  ngOnInit(): void {
    this.setupColors();
  }

  ngDoCheck(): void {
    let changes = this.differ.diff(this.survivor.equipments.get(this.position));
    if (changes) {
      this.setupColors();
    }
  }

  setupColors() {
    const equipment: Equipment = this.survivor.equipments.get(this.position);
    this.backgroundUp = {};
    this.backgroundDown = {};
    this.backgroundLeft = {};
    this.backgroundRight = {};
    if (equipment) {
      if (equipment.affinities.get(Affinity.BLUE)) {
        this.setAffinityColour(equipment, Affinity.BLUE, 'blue');
      }
      if (equipment.affinities.get(Affinity.GREEN)) {
        this.setAffinityColour(equipment, Affinity.GREEN, 'green');
      }
      if (equipment.affinities.get(Affinity.RED)) {
        this.setAffinityColour(equipment, Affinity.RED, 'red');
      }
    }
  }

  setAffinityColour(equipment: Equipment, affinity: Affinity, colour: string): void {
    equipment.affinities.get(affinity).forEach(direction => {
      switch (direction) {
        case Direction.DOWN:
          this.backgroundDown = {'background': colour};
          break;
        case Direction.LEFT:
          this.backgroundLeft = {'background': colour};
          break;
        case Direction.RIGHT:
          this.backgroundRight = {'background': colour};
          break;
        case Direction.UP:
          this.backgroundUp = {'background': colour};
          break;
        default:
          console.log('Direction not found: ' + direction);
      }
    });
  }

  selectEquipment(): void {
    const storageEquipmentItems = this.settlement.storages.filter(storage => (storage as Equipment).affinities !== undefined);
    this.router.navigate(['/equipments', {
      equipments: storageEquipmentItems, survivor: this.survivor, position: this.position,
    }]).then();
  }

  showDetailsOrChange(): void {
    this.router.navigate(['/equipment', {
      equipment: this.survivor.equipments.get(this.position), equipments: this.settlement.storages, survivor: this.survivor, position: this.position,
    }]).then();
  }

}
