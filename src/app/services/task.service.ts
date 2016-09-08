import { OpaqueToken } from "@angular/core";

import { Task } from "app/models/task";
import { Project } from "app/models/project";

export interface Class {
	getAll( project:Project ):Promise<Task[]>;

	create( project:Project, task:Task ):Promise<Task>;
}

export const Token:OpaqueToken = new OpaqueToken( "TaskService" );

export default Class;