import { OpaqueToken } from "@angular/core";

import { User } from "app/models/user";

export interface Class {
	getAll():Promise<User[]>;
}

export const Token:OpaqueToken = new OpaqueToken( "UserService" );

export default Class;
