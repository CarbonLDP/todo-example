import { Injectable, Inject } from "@angular/core";

import { Project } from "app/models/project";
import { Task } from "app/models/task";

import * as ProjectService from "app/services/project.service";
import * as TaskService from "app/services/task.service";

@Injectable()
export class StubTaskService implements TaskService.Class {
	private projectTasks:Map<Project, Task[]> = new Map<Project, Task[]>();
	private ready:Promise<any>;

	constructor( @Inject( ProjectService.Token ) private projectService:ProjectService.Class ) {
		this.ready = projectService.getAll().then( ( projects ) => {
			this.projectTasks.set( projects[ 0 ], [
				{
					title: "Analyze the intense depth of the codebase",
					description: "Gaze into it while your thoughts drift away",

					dueDate: new Date( 10, 11, 2016 ),
					project: projects[ 0 ]
				}
			] );

			this.projectTasks.forEach( ( tasks:Task[], project:Project ) => {
				if( ! project.tasks ) project.tasks = [];

				project.tasks.push.apply( project.tasks, tasks );
			} );
		} );
	}

	getAll( project:Project ):Promise<Task[]> {
		return this.ready.then( () => {
			return new Promise( ( resolve:( result:Project[] ) => void, reject:() => void ) => {
				setTimeout( () => {
					let tasks:Task[] = this.projectTasks.get( project );
					tasks = tasks ? tasks.slice( 0 ) : [];

					resolve( tasks );
				}, 2000 );
			} );
		} );
	}

	create( project:Project, task:Task ):Promise<Task> {
		return this.ready.then( () => {
			return new Promise( ( resolve:( result:Task ) => void, reject:() => void ) => {
				setTimeout( () => {
					task.project = project;

					if( ! project.tasks ) project.tasks = [];
					project.tasks.push( task );

					if( ! this.projectTasks.has( project ) ) this.projectTasks.set( project, [] );
					this.projectTasks.get( project ).push( task );

					resolve( task );
				}, 2000 );
			} );
		} );
	}
}
