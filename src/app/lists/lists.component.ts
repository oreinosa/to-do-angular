import { Container } from './../shared/models/crud/container';
import { Component, OnInit } from '@angular/core';
import { List } from '../shared/models/list';
import { ListsService } from './lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent extends Container<List> {
  constructor(
    public listsService: ListsService
  ) {
    super(listsService);
  }

}
