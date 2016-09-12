"use strict";

const gulp = require( "gulp" );
const runSequence = require( "run-sequence" );
const del = require( "del" );
const rename = require( "gulp-rename" );

const Builder = require( "jspm" ).Builder;

const ejs = require( "gulp-ejs" );

const webserver = require( "gulp-webserver" );

const argv = require( "yargs" )
	.usage( "Usage: [-p profile]" )
	.describe( "p", "Active profile to load configuration from" )
	.alias( "p", "profile" )
	.default( "p", "local" )
	.argv;
const profile = argv.p;
const profileConfig = require( "./config/" + profile );

const config = {
	nodeDependencies: [
		"node_modules/es6-shim/es6-shim.js",
		"node_modules/systemjs/dist/system-polyfills.src.js",
		"node_modules/systemjs/dist/system.src.js",
		"node_modules/rxjs/bundles/Rx.js",
		"node_modules/jquery/dist/jquery.min.js",
	],
};

gulp.task( "default", [ "serve" ] );

gulp.task( "copy:node-dependencies", () => {
	return gulp.src( config.nodeDependencies ).pipe( gulp.dest( "src/assets/node_modules" ) );
} );

gulp.task( "copy:assets", [ "copy:node-dependencies" ], () => {
	return gulp.src( "src/assets/**/*", {
		base: "src/assets"
	} ).pipe( gulp.dest( "dist/site/assets" ) );
} );

gulp.task( "compile:config", () => {
	return gulp.src( "src/app/config.ejs.ts" )
		.pipe( ejs( profileConfig ) )
		.pipe( rename( "config.ts" ) )
		.pipe( gulp.dest( "src/app/" ) )
} );

gulp.task( "compile:index", () => {
	return gulp.src( "dist/index.ejs.html" )
		.pipe( ejs( profileConfig ) )
		.pipe( rename( "index.html" ) )
		.pipe( gulp.dest( "dist/site/" ) );
} );

gulp.task( "serve", [ "copy:node-dependencies", "compile:config" ], () => {
	return gulp.src( "." )
		.pipe( webserver( {
			livereload: false,
			directoryListing: false,
			fallback: "/src/index.html",
			open: "src/index.html",
			port: 8045
		} ) );
} );

gulp.task( "serve:dist", [ "build" ], () => {
	return gulp.src( "." )
		.pipe( webserver( {
			livereload: false,
			directoryListing: false,
			fallback: "/dist/site/index.html",
			open: "dist/site/index.html",
			port: 8045
		} ) );
} );

gulp.task( "clean:dist", () => {
	return del( [ "dist/site/**" ] );
} );

gulp.task( "bundle", () => {
	let builder = new Builder();
	return builder.buildStatic( "app/boot", "dist/site/main.sfx.js", {
		minify: false,
		mangle: false,
		sourceMaps: false
	} );
} );

gulp.task( "build", [ "clean:dist" ], ( callback ) => {
	runSequence(
		"clean:dist",
		[ "compile:config", "compile:index", "copy:assets" ],
		"bundle",
		callback
	);
} );
