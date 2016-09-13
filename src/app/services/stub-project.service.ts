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
				description : "Improvements needed in order to enhance the user experience of visitors to the Acme users portal. The only allowed changes to backend are those who can speed up the retrieval of information.",
			},
			{
				title : "Groundos - Ground Transportation Ticketing System",
				description : "A whole solution including a mobile app and a web portal to buy and sell tickets to multiple buses.",
			},
			{
				title : "Globex - Product managment for retail",
				description : "",
			},
			{
				title : "Game - The notebook",
				description : "",
			}
		);
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
