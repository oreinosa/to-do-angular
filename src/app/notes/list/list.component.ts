import { List } from './../../shared/models/crud/list';
import { Component, } from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap, map, filter } from 'rxjs/operators';
import { STATUSES } from 'src/app/shared/maps';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends List<Note> {
  statuses = STATUSES;
  selectedStatusCtrl = new FormControl();
  allNotes = [];
  loading = false;
  constructor(
    public notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(notesService);
  }

  ngOnInit() {
    this.selectedStatusCtrl
      .valueChanges
      .subscribe(value => this.onSelectStatus(value));

    this.loading$ = this.notesService.getLoadingObservable();

    this.all$ = this.notesService.getAllObservable()
      .pipe(
        filter(notes => !!notes?.length),
        tap(notes => {
          this.allNotes = notes
        }),
        switchMap(() => this.route.queryParamMap),
        map(params => {
          const listName = params.get('list');
          const status = params.get('status');
          let filteredNotes = [...this.allNotes];
          if (!!listName) {
            filteredNotes = filteredNotes.filter(note => note.list.name === listName);
          }
          if (!!status) {
            filteredNotes = filteredNotes.filter(note => note.status === status);
          }
          console.log("listName => ", listName);
          console.log("status => ", status);
          console.log("filteredNotes => ", filteredNotes);
          return filteredNotes;
        })
      );
  }

  onSelectStatus(status: string) {
    const queryParams = {
      status: status || undefined
    };
    this.router.navigate(['/'], { queryParams, queryParamsHandling: 'merge' })
  }

  async onUpdateStatus(note: Note, status: string) {
    try {
      const updatedList = await this.notesService.updateStatus(note, status);
    } catch (e) {
      console.log(e);
    }
  }

}
