import { OpaqueToken } from "@angular/core";

import { AuthService } from "angular2-carbonldp/services";
import { User } from "app/models/user";

export interface Class extends AuthService.Class {
	getAuthenticatedUser():User;
}

export const Token:OpaqueToken = AuthService.Token;
