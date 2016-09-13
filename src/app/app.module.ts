import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS, AuthService } from "angular2-carbonldp/services";

import { ProjectService, TaskService, UserService } from "app/services";
import { ExtendedCarbonAuthService } from "app/services/carbon-auth.service";
import { CarbonProjectService } from "app/services/carbon-project.service";
import { CarbonTaskService } from "app/services/carbon-task.service";
import { CarbonUserService } from "app/services/carbon-user.service";

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
	let authProvider:any = serviceProviders.find( ( provider ) => {
		return provider.provide === AuthService.Token;
	} );
	authProvider.useClass = ExtendedCarbonAuthService;
	serviceProviders.push( [
		{
			provide: ProjectService,
			useClass: CarbonProjectService,
		},
		{
			provide: TaskService,
			useClass: CarbonTaskService,
		},
		{
			provide: UserService,
			useClass: CarbonUserService,
		}
	] );

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