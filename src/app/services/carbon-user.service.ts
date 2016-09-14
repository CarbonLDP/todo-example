import { Inject } from "@angular/core";

import { ContextToken } from "angular2-carbonldp/boot";
import Context from "carbonldp/Context";

import { UserService } from "app/services";

export class CarbonUserService implements UserService.Class {
	constructor( @Inject( ContextToken ) private context:Context ) {}

	init():Promise<any> {
		// Nothing to initialize
		return Promise.resolve();
	}

	getAll() {
		// TODO

		return null;
	}
}

export default CarbonUserService;
