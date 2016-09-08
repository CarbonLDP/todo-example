import { Injectable, EventEmitter } from "@angular/core";

import * as HTTP from "carbonldp/HTTP";
import { User } from "app/models/user";

import { AuthService } from "angular2-carbonldp/services";

interface Credentials {
	username:string;
	password:string;
	user:User;
}

@Injectable()
export class StubAuthService implements AuthService.Class {
	public loggedInEmitter:EventEmitter<any> = new EventEmitter<any>();
	public loggedOutEmitter:EventEmitter<any> = new EventEmitter<any>();
	public authChangedEmitter:EventEmitter<any> = new EventEmitter<any>();

	private credentials:Credentials[] = [
		{
			username: "leipzig@carbonldp.com",
			password: "leipzig",
			user: {
				name: "John Cena",
				avatar: "http://www.famousbirthdays.com/headshots/john-cena-4.jpg"
			}
		}
	];

	private currentUser:User = this.credentials[ 0 ].user;

	constructor() {
		this.loggedInEmitter.subscribe( this.authChangedEmitter.emit.bind( this.authChangedEmitter ) );
		this.loggedOutEmitter.subscribe( this.authChangedEmitter.emit.bind( this.authChangedEmitter ) );
	}

	isAuthenticated():boolean {
		return this.currentUser !== null;
	}

	getAuthenticatedUser():User {
		return this.currentUser;
	}

	login( username:string, password:string, rememberMe:boolean ):Promise<any> {
		let credentials:Credentials = this.credentials.find( ( credentials ) => {
			return credentials.username === username && credentials.password === password;
		} );

		if( ! credentials ) return Promise.reject( new HTTP.Errors.UnauthorizedError( "Invalid credentials", <any>{ status: 401 } ) );

		this.currentUser = credentials.user;

		this.loggedInEmitter.emit( null );
		return Promise.resolve();
	}

	logout():void {
		this.currentUser = null;

		this.loggedInEmitter.emit( null );
	}

	register( name:string, username:string, password:string, slug?:string ):Promise<any> {
		if( this.usernameAlreadyExists( username ) ) return Promise.reject( new HTTP.Errors.ConflictError( "Username is already being used", <any>{ status: 409 } ) );

		this.credentials.push( {
			username: username,
			password: password,
			user: {
				name: name,
				avatar: "assets/images/wireframe.png"
			}
		} );

		return Promise.resolve();
	}

	private usernameAlreadyExists( username:string ):boolean {
		return ! ! this.credentials.find( ( credentials ) => {
			return credentials.username === username;
		} );
	}

}
