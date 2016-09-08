import { Component, Input, Output, Inject, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Task } from "app/models/task";
import { Project } from "app/models/project";

import { TaskService } from "app/services";

import template from "./task-form.component.html!text";

@Component( {
	selector: "div.task-form",
	template: template,
	styles: [],
	directives: [],
} )
export class TaskFormComponent implements OnInit {
	@Input( "task" ) task:Task;
	@Input( "project" ) project:Project;

	@Output( "save" ) saveEventEmitter:EventEmitter<Task> = new EventEmitter<Task>();
	@Output( "cancel" ) cancelEventEmitter:EventEmitter<any> = new EventEmitter<any>();

	@ViewChild( NgForm ) private form:NgForm;

	private active:boolean = true;
	private loading:boolean = false;
	private editMode:boolean = false;
	private model:{ dueDate?:string, assignedTo?:string, labels?:string } = {};

	constructor( @Inject( TaskService.Token ) private taskService:TaskService.Class ) {}

	ngOnInit():void {
		this.editMode = ! ! this.task;

		if( ! this.editMode ) {
			if( ! this.project ) throw new Error( "You need to specify a project when creating a task" );
			this.task = <any>{};
		}
	}

	submit():void {
		if( ! this.form.form.valid ) return;

		if( this.editMode ) this.saveTask();
		else this.createTask();
	}

	createTask():void {
		this.setTaskDueDate();

		this.loading = true;
		let labelStrings:string[] = this.getLabelStrings();

		// TODO: Get or create labels

		this.taskService.create( this.project, this.task ).then( ( task ) => {
			this.loading = false;
			this.saveEventEmitter.emit( task );
		} );
	}

	saveTask():void {
		// TODO
	}

	cancel():void {
		this.cancelEventEmitter.emit();
	}

	private setTaskDueDate():void {
		this.task.dueDate = this.parseDate( this.model.dueDate );
	}

	private getLabelStrings():string[] {
		let labelParts:string[] = this.model.labels.split( "," );
		return labelParts.map( string => string.trim() );
	}

	private parseDate( dateString:string ):Date {
		let parts:string[] = dateString.split( "/" );
		return new Date( parseInt( parts[ 2 ], 10 ), parseInt( parts[ 1 ], 10 ) - 1, parseInt( parts[ 0 ], 10 ) );
	}
}

export default TaskFormComponent;
