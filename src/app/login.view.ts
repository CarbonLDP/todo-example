import { Component, ViewEncapsulation, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import * as HTTP from "carbonldp/HTTP";

import { AuthService } from "angular2-carbonldp/services";

import template from "./login.view.html!text";
import style from "./login.view.css!text";

@Component( {
	selector: "div.login",
	template: template,
	styles: [
		style
	],
	encapsulation: ViewEncapsulation.None,
} )
export class LoginView implements OnInit, OnDestroy {
	private model:{ username?:string, password?:string } = {};
	private active:boolean = true;
	private error:string;

	constructor( @Inject( AuthService.Token ) private authService:AuthService.Class, private router:Router ) {}

	ngOnInit():void {
		document.querySelector( "body" ).classList.add( "view--login" );
	}

	ngOnDestroy():void {
		document.querySelector( "body" ).classList.remove( "view--login" );
	}

	private onLogin():void {
		this.authService.login( this.model.username, this.model.password, false ).then( () => {
			this.router.navigate( [ "/home" ] );
		}).catch( ( error ) => {
			if( error instanceof HTTP.Errors.UnauthorizedError ) {
				this.error = error.name;
			} else {
				this.error = "UnknownError";
			}
		});
	}
}

export default LoginView;
