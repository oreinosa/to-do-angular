import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
export class DAO<T> {
  private actionSubject = new BehaviorSubject("list");
  private loadingSubject = new BehaviorSubject(false);
  api = environment.api;

  private allSubject = new BehaviorSubject<T[]>(null);
  private objectSubject = new BehaviorSubject<T>(null);

  constructor(
    public http: HttpClient,
    public collectionName: string,
    public documentName: string,
    public router: Router
  ) { }

  onBack() {
    this.setObject(null);
    this.setAction("list");
    this.router.navigate(['/']);
  }

  getLoadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
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
      this.loadingSubject.next(true);
      const all = await this.http
        .get(`${this.api}/${this.collectionName}`)
        .pipe(
          map((res: any) => res.data as T[]),
        )
        .toPromise();
      console.log(`${this.collectionName} => `, all);
      this.allSubject.next(all);
    } catch (e) {
      console.log(e);
      this.allSubject.next([]);
    } finally {
      this.loadingSubject.next(false);
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

  update(id: string, note: T, params?: HttpParams) {
    return this.http
      .put(`${this.api}/${this.collectionName}/${id}`, note, { params })
      .pipe(
        map((res: any) => res.data as T),
        tap(note => this.allSubject.next([...this.allSubject.value.map(_object => _object["_id"] === id ? note : _object)]))
      )
      .toPromise();
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
