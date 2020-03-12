import { NgModule } from '@angular/core';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NotesComponent, AddComponent, UpdateComponent, DeleteComponent],
  imports: [
    SharedModule,
    NotesRoutingModule
  ],
  exports: [NotesComponent, AddComponent, DeleteComponent, UpdateComponent]
})
export class NotesModule { }
