import { NgModule } from '@angular/core';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListsComponent, AddComponent, DeleteComponent, UpdateComponent, ListComponent],
  imports: [
    SharedModule,
    ListsRoutingModule
  ],
  exports: [ListsComponent, AddComponent, DeleteComponent, UpdateComponent]
})
export class ListsModule { }
