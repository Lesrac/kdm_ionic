import { AddLinebreakToPunctuationPipe } from '../pipe/add-linebreak-to-punctuation.pipe';
import { MapValuesPipe } from '../pipe/map-values.pipe';
import { NgModule } from '@angular/core';
import { RemoveWhitespacePipe } from '../pipe/remove-whitespace.pipe';
import { TextFormattingPipe } from '../pipe/text-formatting.pipe';
import { FilterElementsPipe } from '../pipe/filter-elements.pipe';
import { InputNumberComponent } from '../pages/template/input-number.component';
import { IonicModule } from '@ionic/angular';
import { DiceThrowComponent } from '../pages/template/dice-throw.component';
import { ShowListComponent } from '../pages/template/show-list.component';
import { ShowListAddModalComponent } from '../pages/template/show-list-add-modal.component';
import { ShowListDetailComponent } from '../pages/template/show-list-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelineEventModalComponent } from '../pages/timeline/timeline-event-modal.component';
import { StorageModalComponent } from '../pages/storage/storage-modal.component';
import { FormattedTextModalComponent } from '../pages/template/formatted-text-modal.component';
import { AddedResourcesModalComponent } from '../pages/defeated_monster/added-resources-modal.component';

@NgModule({
  declarations: [InputNumberComponent, AddLinebreakToPunctuationPipe, TextFormattingPipe, MapValuesPipe, FilterElementsPipe, RemoveWhitespacePipe,
    DiceThrowComponent, ShowListComponent, ShowListDetailComponent, ShowListAddModalComponent, TimelineEventModalComponent, StorageModalComponent,
    FormattedTextModalComponent, AddedResourcesModalComponent],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [InputNumberComponent, AddLinebreakToPunctuationPipe, TextFormattingPipe, MapValuesPipe, FilterElementsPipe, RemoveWhitespacePipe,
    DiceThrowComponent, ShowListComponent, ShowListDetailComponent, ShowListAddModalComponent, TimelineEventModalComponent, StorageModalComponent,
    FormattedTextModalComponent, AddedResourcesModalComponent],
  entryComponents: [TimelineEventModalComponent],
})
export class ParentModule {
}
