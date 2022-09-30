import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { application } from 'express';
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

interface INewTask {
  description: string;
  title: string;
  completed?: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  welcome = "Here is a welcome message from the ts file";
  tasks: any= []
  oneTask: any = {};
  newTask: any;
  taskToEdit: any;
  constructor(private _httpService: HttpService, private ref: ChangeDetectorRef){
    // this.newTask = {title: "Hello", description: "There"}
  }




  ngOnInit() {
    // this.getTasksFromService();
    // this.getOneTaskFromService('6335b3d3b79d48200051c7e3');
    this.newTask = {title: "Hello", description: "There"}
    console.log("NEW TASK : ", this.newTask.title)
  }

  handleTaskSubmit = () => {
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("Data from post ", data);
      this.newTask = {title: "", description: ""};
    })
  }

  openEditTaskForm = (id: string) => {
    const taskObservable = this._httpService.getOneTask(id);
    taskObservable.subscribe(data => {
      this.oneTask  = data;
      console.log("This one task ", this.oneTask);
      this.taskToEdit.title = this.oneTask.title;
    this.taskToEdit.description = this.oneTask.description
    })
    
    // this.taskToEdit = this.oneTask;
    console.log("Edit Click fired")
  }

  editTaskSubmit = (TaskToEdit: any) => {
    const observable = this._httpService.editTask(TaskToEdit);
    observable.subscribe(data => {
      console.log("Data from edit :", data);
      this.taskToEdit = undefined;
    })
  }

  getTasksFromService() {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Data from observable : ", data);
      this.tasks = data ;
      
      console.log("Tasks as tasks : ", this.tasks);
    })
  }

  getOneTaskFromService(id: string) {
    const taskObservable = this._httpService.getOneTask(id);
    taskObservable.subscribe(data => {
      this.oneTask  = data;
      console.log("This one task ", this.oneTask);
    })
  }

  clickedTask(id: string) {
    this.getOneTaskFromService(id);
  }
}
