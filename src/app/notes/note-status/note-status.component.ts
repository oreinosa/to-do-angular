import { Component, Input, Output, EventEmitter } from '@angular/core';
import { STATUSES, STATUSES_MAP } from '../../shared/maps';
@Component({
  selector: 'app-note-status',
  templateUrl: './note-status.component.html',
  styleUrls: ['./note-status.component.scss']
})
export class NoteStatusComponent {
  @Input() status: string = 'New';
  @Output("selectStatus") statusEmitter = new EventEmitter<string>();
  statusesMap = STATUSES_MAP;
  statuses = STATUSES.filter(status => status !== "New");

  onSelect(status: string) {
    console.log(status);
    this.statusEmitter.emit(status);
  }
}