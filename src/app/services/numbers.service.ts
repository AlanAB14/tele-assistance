import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {

  private _url = environment.apiBase;

  constructor( private http: HttpClient ) { }

  getNumbers() {
    return this.http.get(`${ this._url }/numbersUs`).pipe(delay(1000))
  }

  editNumbers(data: any) {
    return this.http.patch(`${ this._url }/numbersUs`, data)
  }

}
