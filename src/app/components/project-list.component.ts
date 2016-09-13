import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";

import { Project } from "app/models/project";

import { ProjectService } from "app/services";

import template from "./project-list.component.html!text";
import style from "./project-list.component.css!text";

@Component( {
	selector: "div.project-list",
	template: template,
	styles: [
		style
	],
	directives: [],
	host: {
		class: "segment-panel"
	}
} )
export class ProjectListComponent {
	@Input( "projects" ) projects:Project[];
	@Input( "selectedProject" ) selectedProject:Project;
	@Input( "loading" ) loading:boolean = false;

	@Output( "selectedProjectChange" ) selectedProjectChange:EventEmitter<Project> = new EventEmitter<Project>();
	@Output( "projectCreate" ) projectCreate:EventEmitter<Project> = new EventEmitter<Project>();

	private creationModeEnabled:boolean = false;
	private model:Project;

	constructor( @Inject( ProjectService.Token ) private projectService:ProjectService.Class ) {
		this.resetModel();
	}

	private selectProject( project:Project ):void {
		this.selectedProject = project;

		this.selectedProjectChange.emit( project );
	}

	private enableCreationMode():void {
		this.creationModeEnabled = true;
	}

	private disableCreationMode():void {
		this.creationModeEnabled = false;
	}

	private resetModel():void {
		this.model = {
			title: ""
		};
	}

	private createProject():void {
		this.loading = true;
		this.projectService.create( this.model ).then( ( project:Project ) => {
			this.resetModel();
			this.loading = false;
			this.creationModeEnabled = false;

			this.projectCreate.emit( project );
		} );
	}

	private isArray( value:any ):boolean {
		return Array.isArray( value );
	}
}

export default ProjectListComponent;
