import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
export class DAO<T> {
  private actionSubject = new BehaviorSubject("list");
  private api = environment.api;

  private allSubject = new BehaviorSubject<T[]>([]);
  private objectSubject = new BehaviorSubject<T>(null);

  constructor(
    public http: HttpClient,
    public collectionName: string,
    public docName: string
  ) { }

  onBack() {
    this.setObject(null);
    this.setAction("list");
  }

  getAllObservable(): Observable<T[]> {
    return this.allSubject.asObservable();
  }
  getObjectObservable(): Observable<T> {
    return this.objectSubject.asObservable();
  }

  getAction(): Observable<string> {
    return this.actionSubject.asObservable();
  }

  setObject(note: T) {
    this.objectSubject.next(note);
  }

  setAction(action: string): void {
    this.actionSubject.next(action);
  }

  async getAll() {
    try {
      const all = await this.http
        .get(`${this.api}/${this.collectionName}`)
        .pipe(
          map((res: any) => res.data as T[]),
      )
        .toPromise();
      console.log(all);
      this.allSubject.next(all);
    } catch (e) {
      console.log(e);
      this.allSubject.next([]);
    }
  }

  create(note: T) {
    return this.http
      .post(`${this.api}/${this.collectionName}`, note)
      .pipe(
        map((res: any) => res.data as T),
        tap(note => this.allSubject.next([...this.allSubject.value, note]))
      )
      .toPromise();
  }

  update(id: string, note: T) {
    return this.http
      .put(`${this.api}/${this.collectionName}/${id}`, note)
      .pipe(
        map((res: any) => res.data as T),
        tap(note => this.allSubject.next([...this.allSubject.value.map(_object => _object["_id"] === id ? note : _object)]))
      )
      .toPromise();;
  }
  delete(id: string) {
    return this.http
      .delete(`${this.api}/${this.collectionName}/${id}`)
      .pipe(
        tap(() => this.allSubject.next([...this.allSubject.value.filter(_object => _object["_id"] !== id)]))
      )
      .toPromise();
  }
}
