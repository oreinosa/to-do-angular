import { List } from './../../shared/models/crud/list';
import { Component, } from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap, map, filter } from 'rxjs/operators';
import { STATUSES } from 'src/app/shared/maps';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends List<Note> {
  statuses = STATUSES;
  selectedStatus = "";
  allNotes = [];
  loading = false;
  refresh = false;
  constructor(
    public notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(notesService);
  }

  ngOnInit() {
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
          } else {
            console.log('selected status')
            this.selectedStatus = "";
          }
          if (!!status) {
            filteredNotes = filteredNotes.filter(note => note.status === status);
          }
          this.refresh = !this.refresh;
          return filteredNotes;
        })
      );
    this.getAll();
  }

  onSelectStatus(status: string) {
    const queryParams = {
      status: status || undefined
    }
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
