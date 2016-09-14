import { Inject } from "@angular/core";

import { ContextToken } from "angular2-carbonldp/boot";
import Context from "carbonldp/Context";

import { ProjectService } from "app/services";

export class CarbonProjectService implements ProjectService.Class {


	constructor( @Inject( ContextToken ) private context:Context ) {}

	init():Promise<any> {
		return this.context.documents.exists( "projects/" ).then( ( [ exists ] ) => {
			if( ! exists ) {
				return this.context.documents.createChild( "/", {}, "projects/" );
			} else {
				return Promise.resolve();
			}
		} );
	}

	getAll() {
		return this.context.documents.getMembers( "projects/" ).then( ( [ projects ] ) => {
			return projects;
		} );
	}

	create( project ) {
		return this.context.documents.createChildAndRetrieve( "projects/", project ).then( ( [ project ] ) => {
			return project.createAccessPoint( {
				hasMemberRelation: "tasks"
			}, "tasks/" );
		} ).then( () => {
			return project;
		} );
	}
}

export default CarbonProjectService;
