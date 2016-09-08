import { Injectable } from "@angular/core";

import { Project } from "app/models/project";

import * as ProjectService from "app/services/project.service";

@Injectable()
export class StubProjectService implements ProjectService.Class {
	private _projects:Project[] = [];

	constructor() {
		this._projects.push(
			{
				title: "Acme Refactoring",
			},
			{
				title: "Globex Syndication System",
			},
			{
				title: "Soylent Global Auth",
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
