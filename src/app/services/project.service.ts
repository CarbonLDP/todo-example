import { OpaqueToken } from "@angular/core";

import { Project } from "app/models/project";

export interface Class {
	init():Promise<any>;

	getAll():Promise<Project[]>;

	create( project:Project ):Promise<Project>;
}

export const Token:OpaqueToken = new OpaqueToken( "ProjectService" );

export default Class;
