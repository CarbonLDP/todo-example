import { Component, ViewEncapsulation, OnInit, OnDestroy, Inject } from "@angular/core";

import { ProjectListComponent } from "app/components/project-list.component";
import { LabelListComponent } from "app/components/label-list.component";
import { TaskListComponent } from "app/components/task-list.component";
import { TaskComponent } from "app/components/task.component";
import { TaskFormComponent } from "app/components/task-form.component";

import { Label } from "app/models/label";
import { Project } from "app/models/project";
import { Task } from "app/models/task";
import { User } from "app/models/user";

import { ProjectService, TaskService } from "app/services";

import template from "./dashboard.view.html!text";
import style from "./dashboard.view.css!text";

@Component( {
	selector: "div.dashboard",
	template: template,
	styles: [
		style
	],
	encapsulation: ViewEncapsulation.None,
	directives: [
		ProjectListComponent,
		LabelListComponent,
		TaskListComponent,
		TaskComponent,
		TaskFormComponent
	],
} )
export class DashboardView implements OnInit, OnDestroy {
	users:User[];
	labels:Label[];
	projects:Project[];
	tasks:Task[];

	private loadingProjects:boolean = false;
	private loadingTasks:boolean = false;
	private selectedProject:Project;
	private selectedTask:Task;

	private taskCreationModeEnabled:boolean = false;

	constructor( @Inject( ProjectService.Token ) private projectService:ProjectService.Class,
	             @Inject( TaskService.Token ) private taskService:TaskService.Class ) {}

	ngOnInit():void {
		document.querySelector( "body" ).classList.add( "view--dashboard" );

		this.loadProjects();
	}

	ngOnDestroy():void {
		document.querySelector( "body" ).classList.remove( "view--dashboard" );
	}

	onSelectedProjectChange( project:Project ):void {
		this.selectedProject = project;
		this.selectedTask = null;

		this.loadProjectTasks();
	}

	onProjectCreate( project:Project ):void {
		this.projects.push( project );
	}

	onTaskCreate( task:Task ):void {
		this.tasks.unshift( task );
		this.disableTaskCreationMode();
		this.selectedTask = task;
	}

	loadProjects():void {
		this.loadingProjects = true;
		this.projectService.getAll().then( ( projects:Project[] ) => {
			this.loadingProjects = false;
			this.projects = projects;

			if( this.projects.length !== 0 ) this.selectProject( this.projects[ 0 ] );
		} );
	}

	enableTaskCreationMode():void {
		if( ! this.selectedProject ) return;

		this.selectedTask = null;
		this.taskCreationModeEnabled = true;
	}

	disableTaskCreationMode():void {
		this.taskCreationModeEnabled = false;
	}

	selectProject( project:Project ):void {
		this.selectedProject = project;

		this.loadProjectTasks();
	}

	loadProjectTasks():void {
		this.loadingTasks = true;
		this.taskService.getAll( this.selectedProject ).then( ( tasks ) => {
			this.loadingTasks = false;
			this.tasks = tasks;
		} );
	}
}

export default DashboardView;
