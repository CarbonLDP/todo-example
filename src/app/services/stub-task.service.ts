import { Injectable, Inject } from "@angular/core";

import { Project } from "app/models/project";
import { Task } from "app/models/task";
import { User } from "app/models/user";

import * as ProjectService from "app/services/project.service";
import * as TaskService from "app/services/task.service";

@Injectable()
export class StubTaskService implements TaskService.Class {
	private projectTasks:Map<Project, Task[]> = new Map<Project, Task[]>();
	private ready:Promise<any>;
	private labels:{ UX:string, USABILITY:string, MANAGEMENT:string, CLIENT:string, MEETING:string, DEVELOP:string, TESTING:string, DEPLOYMENT:string, ANALYSIS:string, WEB:string, DESIGN:string, MOBILE:string,} = {
		UX: "UX",
		USABILITY: "Usability",
		MANAGEMENT: "Management",
		CLIENT: "Client",
		MEETING: "Meeting",
		DEVELOP: "Develop",
		TESTING: "Testing",
		DEPLOYMENT: "Deployment",
		ANALYSIS: "Analysis",
		WEB: "Web",
		DESIGN: "Design",
		MOBILE: "Mobile"
	};

	private users:User[] = [
		{
			name: "Matt Tennant",
			avatar: "https://randomuser.me/api/portraits/men/44.jpg"
		},
		{
			name: "Donna Smith",
			avatar: "https://randomuser.me/api/portraits/women/49.jpg"
		},
		{
			name: "Rose Jones",
			avatar: "https://randomuser.me/api/portraits/women/65.jpg"
		},
		{
			name: "Clara Pond",
			avatar: "https://randomuser.me/api/portraits/women/74.jpg"
		},
		{
			name: "Amy Oswald",
			avatar: "https://randomuser.me/api/portraits/women/88.jpg"
		},
		{
			name: "Rory Tyler",
			avatar: "https://randomuser.me/api/portraits/men/61.jpg"
		},
		{
			name: "Raj Cooper",
			avatar: "https://randomuser.me/api/portraits/men/39.jpg"
		},
		{
			name: "John Kowalski",
			avatar: "https://randomuser.me/api/portraits/men/46.jpg"
		},
		{
			name: "Eduardo Zamora",
			avatar: "https://randomuser.me/api/portraits/men/51.jpg"
		},
		{
			name: "Orlando Shumacher",
			avatar: "https://randomuser.me/api/portraits/men/49.jpg"
		},
		{
			name: "Jeff Grassi",
			avatar: "https://randomuser.me/api/portraits/men/40.jpg"
		},
		{
			name: "Yong Linsey",
			avatar: "https://randomuser.me/api/portraits/men/10.jpg"
		},
		{
			name: "Ben Mariner",
			avatar: "https://randomuser.me/api/portraits/men/57.jpg"
		},
		{
			name: "Reggie Polson",
			avatar: "https://randomuser.me/api/portraits/men/57.jpg"
		},
		{
			name: "Loyd Stefaniak",
			avatar: "https://randomuser.me/api/portraits/men/59.jpg"
		},
		{
			name: "Elene Wojcik",
			avatar: "https://randomuser.me/api/portraits/women/54.jpg"
		},
		{
			name: "Rosenda Murrow",
			avatar: "https://randomuser.me/api/portraits/women/56.jpg"
		},
		{
			name: "Cheryl Bartolomeo",
			avatar: "https://randomuser.me/api/portraits/women/84.jpg"
		},
		{
			name: "Charita Cardamone",
			avatar: "https://randomuser.me/api/portraits/women/57.jpg"
		},
		{
			name: "Myrtice Sirmons",
			avatar: "https://randomuser.me/api/portraits/women/58.jpg"
		}
	];

	constructor( @Inject( ProjectService.Token ) private projectService:ProjectService.Class ) {
		this.ready = projectService.getAll().then( ( projects ) => {

			// Tasks of the 'APU - Acme Users Portal Enhancements' project
			this.projectTasks.set( projects[ 0 ], [
				{
					title: "Usability tests",
					description: "Perform a round of interviews with public of the targeted market and colllect data using our UX & Usability laboratory",
					assignedTo: this.users[ 0 ],
					project: projects[ 0 ],
					dueDate: new Date( 2016, 2, 15 ),
					labels: [ this.labels.UX, this.labels.USABILITY, this.labels.TESTING ],
					comments: [
						{
							author: this.users[ 0 ],
							content: "We're almost done with the tests. No complication detected nor intended to occur.",
							createdOn: new Date( "02/07/2016 18:20:10" ),
							replies: [
								{
									author: this.users[ 3 ],
									content: "That's right, can confirm. No further complications detected for this task.",
									createdOn: new Date( "02/07/2016 18:23:45" ),
									replies: []
								}
							]
						}
					]
				},
				{
					title: "Analysis of collected data & proposal of new requierements",
					description: "After processing data collected by previous task, identify possible improvements to the portal.",
					assignedTo: this.users[ 3 ],
					project: projects[ 0 ],
					dueDate: new Date( 2016, 2, 22 ),
					labels: [ this.labels.UX, this.labels.USABILITY, this.labels.ANALYSIS ],
					comments: [
						{
							author: this.users[ 3 ],
							content: "The client loved the 4 proposals of improvement to the portal. No changes needed, we have green light to implement them.",
							createdOn: new Date( "02/27/2016 13:15:07" ),
							replies: []
						}
					]
				},
				{
					title: "Show improvements proposals to client",
					description: "After the creation of proposals, show the multiple choices the client can opt to implement to the portal.",
					assignedTo: this.users[ 4 ],
					project: projects[ 0 ],
					dueDate: new Date( 2016, 2, 26 ),
					labels: [ this.labels.UX, this.labels.USABILITY, this.labels.CLIENT, this.labels.MEETING ],
					comments: [
						{
							author: this.users[ 4 ],
							content: "There were issues with some of our technologies, specifically of compatibility with the technologies of the client. We resolved this by changing our technologies to a different version that's comaptible with the client infrastructure.",
							createdOn: new Date( "03/01/2016 11:14:07" ),
							replies: [
								{
									author: this.users[ 5 ],
									content: "The solution for the presented problems were the indicated, nice.",
									createdOn: new Date( "03/01/2016 11:30:07" ),
									replies: []
								}
							]
						}
					]
				},
				{
					title: "Code home page enhancements",
					description: "Code enhancements of homepage using our standards and our approved web technologies. The improvements approved by client to the home page of the users portal have really great expectations, there's a lot at stake with these enhancements, please consider performance as a crucial aspect. It's very important to test the new code to avoid problems once deployed.",
					assignedTo: this.users[ 9 ],
					project: projects[ 0 ],
					dueDate: new Date( 2016, 3, 15 ),
					labels: [ this.labels.DEVELOP, this.labels.TESTING ],
					comments: []
				},
				{
					title: "Test enhancements in stage environment",
					description: "Before releasing and implementing the enhancements, we need to test all the changes in a clustered staging environment. The tests have been established and are ready to be tested.",
					assignedTo: this.users[ 7 ],
					project: projects[ 0 ],
					dueDate: new Date( 2016, 4, 1 ),
					labels: [ this.labels.TESTING, this.labels.DEPLOYMENT ],
					comments: []
				},
				{
					title: "Deploy to production",
					description: "Only after obtaining successful results on tests in a staging environment, we will proceed to deploy the enhancements to a production environment. Please, be always aware of the needed configuration of the deployment in order to avoid further problems with performance or issues with current normal behavior.",
					assignedTo: this.users[ 6 ],
					project: projects[ 0 ],
					dueDate: new Date( 2016, 4, 25 ),
					labels: [ this.labels.DEPLOYMENT ],
					comments: []
				}
			] );

			// Tasks of the 'Groundos - Ground Transportation Ticketing System' project
			this.projectTasks.set( projects[ 1 ], [
				{
					title: "Design systems objects and interactions diagrams",
					description: "Design the structure of how the multiple actors/entities of the solution will interact with each other. Deliverables are: Class Diagram and Systems interaction diagram.",
					assignedTo: this.users[ 8 ],
					project: projects[ 1 ],
					dueDate: new Date( 2016, 5, 15 ),
					labels: [ this.labels.ANALYSIS, this.labels.DESIGN ]
				},
				{
					title: "Design interfaces",
					description: "Design interfaces that comply with the desired requirements by following the constraints of the class and systems interaction diagrams.",
					assignedTo: this.users[ 9 ],
					project: projects[ 1 ],
					dueDate: new Date( 2016, 5, 20 ),
					labels: [ this.labels.DESIGN, this.labels.WEB, this.labels.MOBILE ]
				},
				{
					title: "Build back end services",
					description: "Build backend services using the class diagram and interaction diagram made for this project. The main goal is to deliver RESTful web services that can be called from any platform.",
					assignedTo: this.users[ 7 ],
					project: projects[ 1 ],
					dueDate: new Date( 2016, 6, 7 ),
					labels: [ this.labels.DEVELOP ],
					comments: [
						{
							author: this.users[ 7 ],
							content: "Done. The services are up & ready to be consumed by the developing platforms. It is available on: https://api.groundon.com/0-2/",
							createdOn: new Date( "06/02/2016 00:00:00" ),
							replies: [
								{
									author: this.users[ 3 ],
									content: "Perfect, I'm going to start integrating your services with my mobile platform.",
									createdOn: new Date( "06/03/2016 15:41:00" ),
									replies: []
								},
								{
									author: this.users[ 7 ],
									content: "Good, let me know if you find any bugs or new features.",
									createdOn: new Date( "06/03/2016 15:10:00" ),
									replies: []
								},
								{
									author: this.users[ 2 ],
									content: "Me too! Good to know the services are up & ready. I am going to start using them as well.",
									createdOn: new Date( "06/03/2016 15:13:30" ),
									replies: []
								},
							]
						},
						{
							author: this.users[ 7 ],
							content: "Some corrections were made to the class diagram, please verify that with the changes made to it, the system still works (on paper) as a whole.",
							createdOn: new Date( "05/01/2016 15:18:07" ),
							replies: [
								{
									author: this.users[ 8 ],
									content: "I'm going to check the changes and i'll perform some paper tests to verify the properly behavior of the solution with the changes.",
									createdOn: new Date( "03/01/2016 13:30:07" ),
									replies: []
								},
								{
									author: this.users[ 8 ],
									content: "The changes made to the diagram doesn't interfere with the behavior of the system as a whole. Good work!",
									createdOn: new Date( "03/01/2016 12:10:07" ),
									replies: []
								},
							]
						}
					]
				},
				{
					title: "Build mobile app module",
					description: "Develop mobile platform using hybrid mobile app development frameworks. The final deliverables are, as stated by the client, 3 apps, one for iOS, another one for Android and lastly Windows Phone.",
					assignedTo: this.users[ 3 ],
					project: projects[ 1 ],
					dueDate: new Date( 2016, 6, 28 ),
					labels: [ this.labels.MOBILE, this.labels.DEVELOP ]
				},
				{
					title: "Build web module",
					description: "Develop a single page application (SPA) complying with the established requirements and implementing the designed interfaces by consuming the created web services. It's very important that the loading time must last less than 10 seconds.",
					assignedTo: this.users[ 2 ],
					project: projects[ 1 ],
					dueDate: new Date( 2016, 6, 28 ),
					labels: [ this.labels.WEB, this.labels.DEVELOP ]
				},
				{
					title: "Test Mobile Apps",
					description: "Test the mobile apps to verify that each one complies with the established requirements and with the designed interfaces. ",
					assignedTo: this.users[ 3 ],
					project: projects[ 1 ],
					dueDate: new Date( 2016, 7, 1 ),
					labels: [ this.labels.TESTING, this.labels.MOBILE ],
					comments: [
						{
							author: this.users[ 3 ],
							content: "Finished testing and didn't detect problems, maybe a bit slow, but that was caused by the network. We can proceed with release",
							createdOn: new Date( "07/01/2016 00:00:00" ),
							replies: []
						}
					]
				},
				{
					title: "Test Website",
					description: "Test the website and evrify that it complies with the established requirements and with the designed interfaces. Be very clear of the malfunctions on any side, back or fron, in order to deliver a robust product to the client.",
					assignedTo: this.users[ 2 ],
					project: projects[ 1 ],
					dueDate: new Date( 2016, 7, 1 ),
					labels: [ this.labels.TESTING, this.labels.WEB ],
					comments: [
						{
							author: this.users[ 2 ],
							content: "Finished testing. No problems detected. We've made a really good work, team!!",
							createdOn: new Date( "07/01/2016 00:00:00" ),
							replies: []
						}
					]
				},
				{
					title: "Release first beta",
					assignedTo: this.users[ 5 ],
					description: "After testing the website and apps and after aserting that everyone works fine, release the website and apps to their corresponding app store.",
					project: projects[ 1 ],
					dueDate: new Date( 2016, 7, 10 ),
					labels: [ this.labels.DEPLOYMENT ]
				}
			] );

			// Tasks of the 'Globex - Product managment for retail' project
			this.projectTasks.set( projects[ 2 ], [
				{
					title: "client specifications",
					description: "meet the client to now their specifications ",
					assignedTo: this.users[ 12 ],
					project: projects[ 2 ],
					dueDate: new Date( 2015, 11, 20 ),
					labels: [ this.labels.MANAGEMENT, this.labels.CLIENT, this.labels.MEETING, this.labels.ANALYSIS ],
					comments: [
						{
							author: this.users[ 12 ],
							content: "the meeting with the client has been very productive, i'll send an email with the specifications",
							createdOn: new Date( 2015, 12, 20 ),
							replies: [],
						},
					]
				},
				{
					title: "server side development",
					description: "design and develop the server that the project will use",
					assignedTo: this.users[ 18 ],
					project: projects[ 2 ],
					dueDate: new Date( 2015, 11, 20 ),
					labels: [ this.labels.MANAGEMENT, this.labels.DEVELOP, this.labels.TESTING, this.labels.DESIGN ],
					comments: [
						{
							author: this.users[ 19 ],
							content: "Hi, can we talk for a moment, i have some questions about the comunication protocol that we'll use",
							createdOn: new Date( "2015-11-20 17:59:50" ),
							replies: [
								{
									author: this.users[ 18 ],
									content: "yeah sure, let's have a meeting",
									createdOn: new Date( "2015-11-20 17:59:50" ),
									replies: []
								}
							],
						}
					]
				},
				{
					title: "client side development",
					description: "design and develop the user interface",
					assignedTo: this.users[ 19 ],
					project: projects[ 2 ],
					dueDate: new Date( 2015, 11, 20 ),
					labels: [ this.labels.MANAGEMENT, this.labels.DEVELOP, this.labels.TESTING, this.labels.WEB ]
				},
				{
					title: "deployment",
					description: "deploy the project into production",
					assignedTo: this.users[ 13 ],
					project: projects[ 2 ],
					dueDate: new Date( 2015, 11, 20 ),
					labels: [ this.labels.MANAGEMENT, this.labels.DEPLOYMENT ]
				}
			] );

			// Tasks of the 'Game - The Notebook' project
			this.projectTasks.set( projects[ 3 ], [
				{
					title: "story",
					description: "design and write the game's history",
					assignedTo: this.users[ 10 ],
					project: projects[ 3 ],
					dueDate: new Date( 2016, 12, 2 ),
					labels: [ this.labels.DESIGN, this.labels.DEVELOP ],
					comments: [
						{
							author: this.users[ 11 ],
							content: "This looks great, i want to know how this ends",
							createdOn: new Date( "2015-10-20 18:23:45" ),
							replies: []
						}
					]
				},
				{
					title: "physics",
					description: "design and develop the phisics that will be interacting in the game",
					assignedTo: this.users[ 11 ],
					project: projects[ 3 ],
					dueDate: new Date( 2016, 12, 2 ),
					labels: [ this.labels.DESIGN, this.labels.DEVELOP ],
					comments: [
						{
							author: this.users[ 17 ],
							content: "I thinks there's a little bug in the bounce of the ball",
							createdOn: new Date( "2015-10-20 15:23:43" ),
							replies: [
								{
									author: this.users[ 11 ],
									content: "Hi Cheryl, thanks for pointing that out, we will take a look on it ",
									createdOn: new Date( "2015-11-20 18:47:30" ),
									replies: []
								}
							]
						}
					]
				},
				{
					title: "graphic",
					description: "design and develop of the graphics that will be used in the game",
					assignedTo: this.users[ 17 ],
					project: projects[ 3 ],
					dueDate: new Date( 2016, 12, 2 ),
					labels: [ this.labels.DESIGN, this.labels.DEVELOP ],
					comments: [
						{
							author: this.users[ 16 ],
							content: "Wow, this looks amazing, great work guys",
							createdOn: new Date( "2015-11-20 11:26:09" ),
							replies: []
						}
					]
				},
				{
					title: "integration",
					description: "integrate all parts of the project",
					assignedTo: this.users[ 15 ],
					project: projects[ 3 ],
					dueDate: new Date( 2016, 12, 2 ),
					labels: [ this.labels.DEPLOYMENT, this.labels.TESTING ],
					comments: [
						{
							author: this.users[ 11 ],
							content: "the graphics of the main character does not match in size with it, Can you please take a look at it? ",
							createdOn: new Date( "2015-11-24 15:15:30" ),
							replies: [
								{
									author: this.users[ 17 ],
									content: "Checked, the size is now the one needed",
									createdOn: new Date( "2015-11-20 12:38:11" ),
									replies: [
										{
											author: this.users[ 11 ],
											createdOn: new Date( "2015-11-20 16:09:32" ),
											content: "Ok, thanks",
											replies: [],
										}
									],
								}
							],
						},
						{
							author: this.users[ 16 ],
							content: "The game looks great, i think the background could be changed to be more colorful",
							createdOn: new Date( "2015-11-20 10:20:30" ),
							replies: [],
						}
					]
				},
				{
					title: "game testing",
					description: "play the game and look for opportunity areas",
					assignedTo: this.users[ 16 ],
					project: projects[ 3 ],
					dueDate: new Date( 2017, 1, 15 ),
					labels: [ this.labels.MANAGEMENT, this.labels.ANALYSIS ]
				}
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

	getAll( project:Project ):Promise < Task[ ] > {
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

	create( project:Project, task:Task ):Promise < Task > {
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

	save( task:Task ):Promise < Task > {
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
