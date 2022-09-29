import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
    this.getOneTask('6335b568c3a8cc041e632958');
  }
  
  getTasks() {
    const tempObservable = this._http.get('/task');

    tempObservable.subscribe(data => console.log("Got our Tasks! ", data));
  }

  getOneTask(taskId: String) {
    const oneTaskObservable = this._http.get(`/task/${taskId}`);

    oneTaskObservable.subscribe(data => console.log("Got the Task! ", data));
  }
}

