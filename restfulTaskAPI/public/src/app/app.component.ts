import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

interface ITask  {
  completed: boolean;
  createdAt: Date;
  description: string;
  title: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  welcome = "Here is a welcome message from the ts file";
  tasks: ITask[] = []
  oneTask: any = {};
  constructor(private _httpService: HttpService){}
  ngOnInit() {
      this.getTasksFromService();
      this.getOneTaskFromService();
  }
  getTasksFromService() {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Data from observable : ", data);
      this.tasks = data as ITask[];
      console.log("Tasks as tasks : ", this.tasks);
    })
  }

  getOneTaskFromService() {
    const taskObservable = this._httpService.getOneTask('6335b3d3b79d48200051c7e3');
    taskObservable.subscribe(data => {
      this.oneTask  = data;
      console.log("This one task ", this.oneTask);
    })
  }
}
