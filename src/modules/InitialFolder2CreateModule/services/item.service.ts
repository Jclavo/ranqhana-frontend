import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";
import { SortDirection } from "@modules/items/directives";
import { DecimalPipe } from '@angular/common';

//Models
import { Item } from '@modules/items/models';
import { Response } from '@modules/utility/models';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1: number | string, v2: number | string) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(items: Item[], column: string, direction: string): Item[] {
  if (direction === '') {
    return items;
  } else {
    return [...items].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(item: Item, term: string, pipe: PipeTransform) {
  return (
    item.name.toLowerCase().includes(term.toLowerCase()) ||
    item.description?.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(item.quantity).includes(term)
  );
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _items$ = new BehaviorSubject<Item[]>([]);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  private apiRoot: string = 'https://blooming-hamlet-62206.herokuapp.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      //'Content-Type':  'application/json',
      // 'Authorization': 'Bearer ' + `this.authService.getAPITOKEN()`
      'Authorization': 'Bearer ' + 'DwFCPuQJ9UjAXJ4l8PdHr3PYPfM39JOiCzywD3Wtq5yEX3DoptAcu2pClMemIoTGlNnPSiQqTODYQhUO'
    })
  };

  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe
    // private authService: AuthService
  ) {
    this._search$
      .pipe(
        switchMap(() => this._getAll()),
      )
      .subscribe(result => {
        this._items$.next(result.result);
        this._total$.next(result.records);
      });

    this._search$.next();

  }

  get items$() {
    return this._items$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  set page(page: number) {
    this._set({ page });
  }
  get pageSize() {
    return this._state.pageSize;
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  get searchTerm() {
    return this._state.searchTerm;
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  _getAll(): Observable<Response> {

    let apiRoot = this.apiRoot + 'products';

    return this.http.get(apiRoot, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let item = new Item();
        item.id = data.id;
        item.name = data.name;
        item.description = data.description;
        item.quantity = data.quantity;
        item.store_id = data.store_id;
        item.created_at = data.created_at;
        item.updated_at = data.updated_at;

        return item;
      });

      response.records = resultRAW.result?.length;


      const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

      // 1. sort
      let items = sort(response.result, sortColumn, sortDirection);

      // 2. filter
      items = items.filter(item => matches(item, searchTerm, this.pipe));
      response.records = items.length;

      // 3. paginate
      items = items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

      response.result = items;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
