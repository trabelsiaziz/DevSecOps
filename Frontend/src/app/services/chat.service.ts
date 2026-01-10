import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private http: HttpClient){}

  search(query: string) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}?keyword=${query}`);
  }
  }
