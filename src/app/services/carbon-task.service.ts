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
		// TODO

		return null;
	}

	create( project, task ) {
		// TODO

		return null;
	}

	save( task ) {
		// TODO

		return null;
	}
}

export default CarbonTaskService;
