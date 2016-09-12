import { OpaqueToken } from "@angular/core";

import { User } from "app/models/user";

export interface Class {
	init():Promise<any>;

	getAll():Promise<User[]>;
}

export const Token:OpaqueToken = new OpaqueToken( "UserService" );

export default Class;
