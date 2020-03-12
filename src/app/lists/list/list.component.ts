import { Component, OnInit, Input } from '@angular/core';
import { List } from 'src/app/shared/models/list';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() lists: List[];
  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.listsService.setAction('add');
  }

}
