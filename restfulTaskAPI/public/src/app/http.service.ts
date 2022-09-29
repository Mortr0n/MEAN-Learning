import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
  }
  
  getTasks() {
    // const tempObservable = this._http.get('/task');
    return this._http.get('/task');

    // tempObservable.subscribe(data => console.log("Got our Tasks! ", data));
  }

  getOneTask(taskId: String) {
    return this._http.get(`/task/${taskId}`);

    // oneTaskObservable.subscribe(data => console.log("Got the Task! ", data));
  }
}

