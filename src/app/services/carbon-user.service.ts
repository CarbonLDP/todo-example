import { User } from "app/models/user";

import { UserService } from "app/services";

export class CarbonUserService implements UserService.Class {
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
