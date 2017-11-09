import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KDMDataService } from '../../../service/kdm_data.service';
import { BaseModel } from '../../../model/base_model';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-glossary',
  templateUrl: 'glossary.component.html',
})
export class GlossaryPageComponent implements OnInit {
  filteredGlossaryEntries: BaseModel[];
  allGlossaryEntries: BaseModel[];

  constructor(public navCtrl: NavController, private kdmService: KDMDataService) {
  }

  filterGlossary(event: any): void {
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.filteredGlossaryEntries = this.allGlossaryEntries.filter(glossaryEntry =>
        glossaryEntry.name.toLowerCase().includes(val.toLowerCase().trim()) ||
        glossaryEntry.description.toLowerCase().includes(val.toLowerCase().trim()));
    } else {
      this.filteredGlossaryEntries = this.allGlossaryEntries;
    }
  }

  ngOnInit(): void {
    this.kdmService.getAllGlossaryEntries().then(
      glossaryEntries => {
        this.allGlossaryEntries = glossaryEntries.sort(this.kdmService.sortByName);
        this.filteredGlossaryEntries = this.allGlossaryEntries;
      });
  }

}
