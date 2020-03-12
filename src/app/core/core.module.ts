import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NotesModule } from '../notes/notes.module';
import { ListsModule } from '../lists/lists.module';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [HomeComponent, LandingPageComponent],
  imports: [
    SharedModule,
    NotesModule,
    ListsModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
