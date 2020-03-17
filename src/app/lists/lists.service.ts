import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../shared/models/list';
import { DAO } from '../shared/models/crud/dao';

@Injectable({
  providedIn: 'root'
})
export class ListsService extends DAO<List> {

  constructor(
    public http: HttpClient
  ) {
    super(http, 'lists', 'list');
  }
}
