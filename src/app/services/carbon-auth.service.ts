import Context from "carbonldp/Context";

import { CarbonAuthService } from "angular2-carbonldp/services/carbon-auth.service";

import { User } from "app/models/user";

import { AuthService } from "app/services";

export class ExtendedCarbonAuthService extends CarbonAuthService implements AuthService.Class {
	getAuthenticatedUser():User {
		return (<{ context:Context }>(<any>this)).context.auth.authenticatedAgent;
	}
}