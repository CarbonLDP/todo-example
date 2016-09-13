import { Component, Input } from "@angular/core";

import { Task } from "app/models/task";

import { TaskCommentsComponent } from "app/components/task-comments.component";

import template from "./task.component.html!text";
import style from "./task.component.css!text";

@Component( {
	selector: "div.task",
	template: template,
	styles: [
		style
	],
	directives: [
		TaskCommentsComponent
	],
	host: {
		class: "ui basic segment"
	}
} )
export class TaskComponent {
	@Input( "task" ) task:Task;

	constructor() {}

	private isArray( value:any ):boolean {
		return Array.isArray( value );
	}
}

export default TaskComponent;
