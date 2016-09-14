import { Inject } from "@angular/core";

import { ContextToken } from "angular2-carbonldp/boot";
import Context from "carbonldp/Context";

import { TaskService } from "app/services";

export class CarbonTaskService implements TaskService.Class {
	constructor( @Inject( ContextToken ) private context:Context ) {}

	init():Promise<any> {
		// Nothing to initialize
		return Promise.resolve();
	}

	getAll( project ) {
		return this.context.documents.getMembers( project.id + "tasks/" ).then( ( [ tasks ] ) => {
			return tasks;
		} );
	}

	create( project, task ) {
		return this.context.documents.createChildAndRetrieve( project.id + "tasks/", task ).then( ( [ task ] ) => {
			return project.refresh();
		} ).then( () => {
			return task;
		} );
	}

	save( task ) {
		return task.saveAndRefresh().then( ( [ task ] ) => {
			return task;
		} );
	}
}

export default CarbonTaskService;
