import { Injectable, EventEmitter } from "@angular/core";

import * as HTTP from "carbonldp/HTTP";

import { AuthService } from "angular2-carbonldp/services";

interface Credentials {
	username:string;
	password:string;
}

@Injectable()
export class StubAuthService implements AuthService.Class {
	public loggedInEmitter:EventEmitter<any> = new EventEmitter<any>();
	public loggedOutEmitter:EventEmitter<any> = new EventEmitter<any>();
	public authChangedEmitter:EventEmitter<any> = new EventEmitter<any>();

	private authenticated:boolean = true;

	private credentials:Credentials[] = [
		{
			username: "leipzig@carbonldp.com",
			password: "leipzig"
		}
	];

	constructor() {
		this.loggedInEmitter.subscribe( this.authChangedEmitter.emit.bind( this.authChangedEmitter ) );
		this.loggedOutEmitter.subscribe( this.authChangedEmitter.emit.bind( this.authChangedEmitter ) );
	}

	isAuthenticated():boolean {
		return this.authenticated;
	}

	login( username:string, password:string, rememberMe:boolean ):Promise<any> {
		this.authenticated = ! ! this.credentials.find( ( credentials ) => {
			return credentials.username === username && credentials.password === password;
		} );

		if( ! this.authenticated ) return Promise.reject( new HTTP.Errors.UnauthorizedError( "Invalid credentials", <any>{ status: 401 } ) );

		this.loggedInEmitter.emit( null );
		return Promise.resolve();
	}

	logout():void {
		this.authenticated = false;

		this.loggedInEmitter.emit( null );
	}

	register( name:string, username:string, password:string, slug?:string ):Promise<any> {
		if( this.usernameAlreadyExists( username ) ) return Promise.reject( new HTTP.Errors.ConflictError( "Username is already being used", <any>{ status: 409 } ) );

		this.credentials.push( {
			username: username,
			password: password
		} );

		return Promise.resolve();
	}

	private usernameAlreadyExists( username:string ):boolean {
		return ! ! this.credentials.find( ( credentials ) => {
			return credentials.username === username;
		} );
	}

}
