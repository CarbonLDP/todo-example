import { Component, Input } from "@angular/core";

import { Task } from "app/models/task";

import template from "./task-item.component.html!text";
import style from "./task-item.component.css!text";

@Component( {
	selector: "div.task-item",
	template: template,
	styles: [
		style
	],
	directives: [],
	host: {
		class: "ui basic segment"
	}
} )
export class TaskItemComponent {
	@Input( "task" ) task:Task;

	constructor() {}

	private isArray( value:any ):boolean {
		return Array.isArray( value );
	}
}

export default TaskItemComponent;
