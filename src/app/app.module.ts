import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import { STUBBED_SERVICES_PROVIDERS } from "app/stub-services";

import { SERVICES } from "./config";

import { routing, appRoutingProviders } from "./app.routing";

import { AppComponent } from "./app.component";
import { DashboardView } from "./dashboard.view";
import { LoginView } from "./login.view";

import { ErrorView } from "./error.view";
import { NotFoundView } from "./not-found.view";

let serviceProviders:any[] = [];

if( SERVICES === "carbon" ) {
	serviceProviders.push.apply( serviceProviders, CARBON_SERVICES_PROVIDERS );
} else if( SERVICES === "stubbed" ) {
	serviceProviders.push.apply( serviceProviders, STUBBED_SERVICES_PROVIDERS );
} else {
	throw new Error( "Illegal service provider" );
}

@NgModule( {
	imports: [
		BrowserModule,
		FormsModule,
		routing
	],
	declarations: [
		AppComponent,

		LoginView,

		DashboardView,

		ErrorView,
		NotFoundView,
	],
	providers: [
		appRoutingProviders,
		CARBON_PROVIDERS,
		serviceProviders
	],
	bootstrap: [ AppComponent ],
} )
export class AppModule {
}