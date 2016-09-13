import { Task } from "app/models/task";
import { Project } from "app/models/project";

import { TaskService } from "app/services";

export class CarbonTaskService implements TaskService.Class {
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
