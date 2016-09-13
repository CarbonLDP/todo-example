// There are files that reference this two dependencies and therefore they get included in the bundled file
// This causes a conflict with angular2-polyfills.js, as that file also declares them
// To avoid this, angular2-polyfills.js is no longer included in the index.html and zone and reflect are declared here instead
import { NgModuleRef, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { activeContext, appInjector } from "angular2-carbonldp/boot";

import Carbon from "carbonldp/Carbon";

import { AppModule } from "app/app.module";
import { DEBUG, SERVICES, CARBON_APP, CARBON_DOMAIN, CARBON_HTTPS } from "app/config";

let carbon:Carbon = new Carbon();
// Here you can configure your carbon context, extend your ObjectSchemas, etc.
// Example:
carbon.setSetting( "domain", CARBON_DOMAIN );
carbon.setSetting( "http.ssl", CARBON_HTTPS );

// Uncomment the next statement and replace the string with your app slug. After that, delete the Error below.
if( SERVICES === "stubbed" ) activeContext.initialize( carbon );
else {
	if( CARBON_APP === "your-app-slug/" ) throw new Error( "You haven't declared your app slug!" );
	activeContext.initialize( carbon, CARBON_APP );
}
//

if( ! DEBUG ) enableProdMode();

platformBrowserDynamic().bootstrapModule( AppModule ).then( ( moduleRef:NgModuleRef<AppModule> ) => {
	// Give angular2-carbonldp access to the main injector of the module
	appInjector( moduleRef.injector );
} ).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
} );
