import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class BookListService {

  constructor(private http: Http) { }

  getBookList() {
    let url = 'http://localhost:8080/book/bookList';
    let headers = new Headers({
      'Content-type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, { headers: headers });
  }

  getBook(id: number) {
    let url = 'http://localhost:8080/book/' + id;
    let headers = new Headers({
      'Content-type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, { headers: headers });
  }

  removeBook(id: number){
    let url = 'http://localhost:8080/book/remove/' + id;
    let headers = new Headers({
      'Content-type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, { headers: headers });
  }
  }
