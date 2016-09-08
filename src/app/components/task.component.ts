import { Component, Input } from "@angular/core";

import { Task } from "app/models/task";

import template from "./task.component.html!text";
import style from "./task.component.css!text";

@Component( {
	selector: "div.task",
	template: template,
	styles: [
		style
	],
	directives: [],
	host: {
		class: "ui basic segment"
	}
} )
export class TaskComponent {
	@Input( "task" ) task:Task;

	constructor() {}
}

export default TaskComponent;
