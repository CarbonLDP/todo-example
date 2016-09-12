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
					project: projects[ 0 ],

					labels: [
						"Something",
						"Everything",
						"Nothing"
					],

					comments: [
						{
							author: {
								name: "John Cena",
								avatar: "http://www.famousbirthdays.com/headshots/john-cena-4.jpg"
							},
							content: "This is Jooooooooohn Cena!!",
							createdOn: new Date( 7, 10, 2016 ),
							replies: [
								{
									author: {
										name: "Albert Einstein",
										avatar: "https://pbs.twimg.com/profile_images/661244915725287424/C7vPnSSE.jpg"
									},
									content: "e=mc2",
									createdOn: new Date( 6, 10, 2016 ),
									replies: [
										{
											author: {
												name: "Newton",
												avatar: "https://imgs-steps-dragoart-386112.c.cdn77.org/how-to-draw-isaac-newton-step-8_1_000000130387_5.gif"
											},
											content: "F=ma",
											createdOn: new Date( 5, 10, 2016 ),
											replies: []
										}
									]
								}
							]
						},
						{
							author: {
								name: "Michael Jackson",
								avatar: "http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2016/01/classic_motown_com.jpg"
							},
							content: "Yeah!",
							createdOn: new Date( 8, 10, 2016 ),
						}
					]
				},
				{
					title: "Analyze the intense depth of the codebase",
					description: "Gaze into it while your thoughts drift away",

					dueDate: new Date( 10, 11, 2016 ),
					project: projects[ 0 ],

					labels: [
						"Something",
						"Yo"
					]
				},
				{
					title: "Analyze the intense depth of the codebase",
					description: "Gaze into it while your thoughts drift away",

					dueDate: new Date( 10, 11, 2016 ),
					project: projects[ 0 ],
				},
			] );

			this.projectTasks.set( projects[ 1 ], [
				{
					title: "Analyze the intense depth of the codebase",
					description: "Gaze into it while your thoughts drift away",

					dueDate: new Date( 10, 11, 2016 ),
					project: projects[ 1 ],

					labels: [
						"Project 2",
						"Yo"
					]
				},
			] );

			this.projectTasks.forEach( ( tasks:Task[], project:Project ) => {
				if( ! project.tasks ) project.tasks = [];

				project.tasks.push.apply( project.tasks, tasks );
			} );
		} );
	}

	init():Promise<any> {
		// Nothing to initialize
		return Promise.resolve();
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

	save( task:Task ):Promise<Task> {
		// Do nothing
		// We are passing the object that's saved directly in our "database", so any changes to it are
		// automatically persisted
		return new Promise( ( resolve:( result:Task ) => void, reject:() => void ) => {
			setTimeout( () => {
				resolve( task );
			}, 2000 );
		} );
	}
}
