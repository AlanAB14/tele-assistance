import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get(`${ this._url }/contacts`)
  }

  setContact(data: any) {
    return this.http.post(`${ this._url }/contacts`, data);
  }

  deleteContact(id: number) {
    return this.http.delete(`${ this._url }/contacts/${ id }`)
  }

}
