import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class UserAuthService {

  constructor(private http:HttpClient) { }

  // get token 
  getAuthToken(reqObj):Observable<HttpResponse>{
    //return this.http.post("http://72c1aca9.ngrok.io/api/sessions", reqObj);
    return this.http.get(`http://localhost:3000/data`);
  };

}
