import { Inject } from "@angular/core";

import { ContextToken } from "angular2-carbonldp/boot";
import Context from "carbonldp/Context";

import { ProjectService } from "app/services";

export class CarbonProjectService implements ProjectService.Class {
	constructor( @Inject( ContextToken ) private context:Context ) {}

	init():Promise<any> {
		// TODO
		return null;
	}

	getAll() {
		// TODO

		return null;
	}

	create( project ) {
		// TODO

		return null;
	}
}

export default CarbonProjectService;
