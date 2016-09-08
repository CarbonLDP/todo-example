import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthenticatedGuard, NotAuthenticatedGuard } from "angular2-carbonldp/guards";
import { ActiveContextResolver } from "angular2-carbonldp/resolvers";

import { LoginView } from "app/login.view";
import { DashboardView } from "app/dashboard.view";
import { ErrorView } from "app/error.view";
import { NotFoundView } from "app/not-found.view";

const appRoutes:Routes = [
	{ path: "", redirectTo: "/dashboard", pathMatch: "full" },
	{
		path: "login",
		component: LoginView,
		canActivate: [ NotAuthenticatedGuard ],
		data: {
			onReject: [ "/secured" ],
			onError: [ "/error" ],
		}
	},
	{
		path: "dashboard",
		component: DashboardView,
		canActivate: [ AuthenticatedGuard ],
		data: {
			onReject: [ "/login" ],
			onError: [ "/error" ],
		}
	},
	{ path: "error", component: ErrorView },
	{ path: "**", component: NotFoundView }
];


export const appRoutingProviders:any[] = [
	ActiveContextResolver,
	AuthenticatedGuard,
	NotAuthenticatedGuard,
];

export const routing:ModuleWithProviders = RouterModule.forRoot( appRoutes );
