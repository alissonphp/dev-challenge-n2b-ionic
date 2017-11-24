
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  list(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos')
     .map((res: Response) => res.json())
     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
