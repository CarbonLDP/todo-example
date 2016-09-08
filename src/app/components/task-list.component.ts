import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Task } from "app/models/task";

import { ShortDatePipe } from "app/pipes/short-date.pipe";
import { TaskItemComponent } from "./task-item.component";

import template from "./task-list.component.html!text";

@Component( {
	selector: "div.task-list",
	template: template,
	styles: [],
	directives: [
		TaskItemComponent
	],
	pipes: [
		ShortDatePipe
	]
} )
export class TaskListComponent {
	@Input( "tasks" ) tasks:Task[];
	@Input( "selectedTask" ) selectedTask:Task;
	@Input( "loading" ) loading:boolean = false;

	@Output( "selectedTaskChange" ) selectedTaskChange:EventEmitter<Task> = new EventEmitter<Task>();

	constructor() {}

	onTaskSelect( task:Task ):void {
		this.selectedTask = task;

		this.selectedTaskChange.emit( task );
	}
}

export default TaskListComponent;
