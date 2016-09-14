import { Injectable } from "@angular/core";

import { Project } from "app/models/project";

import * as ProjectService from "app/services/project.service";

@Injectable()
export class StubProjectService implements ProjectService.Class {
	private _projects:Project[] = [];

	constructor() {
		this._projects.push(
			{
				title : "APU - Acme Users Portal Enhancements",
			},
			{
				title : "Groundos - Ground Transportation Ticketing System",
			},
			{
				title : "Globex - Product managment for retail",
			},
			{
				title : "Game - The notebook",
			}
		);
	}

	init():Promise<any> {
		// Nothing to initialize
		return Promise.resolve();
	}

	getAll():Promise<Project[]> {
		return new Promise( ( resolve:( result:Project[] ) => void, reject:() => void ) => {
			setTimeout( () => {
				resolve( this._projects.slice( 0 ) );
			}, 2000 );
		} );
	}

	create( project:Project ):Promise<Project> {
		this._projects.push( project );

		return Promise.resolve( project );
	}
}
