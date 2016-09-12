import { Component, Input, OnInit, Inject, ViewChild, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Comment } from "app/models/Comment";
import { Task } from "app/models/Task";

import { AuthService, TaskService } from "app/services";

import { TaskCommentComponent } from "app/components/task-comment.component";

import template from "./task-comments.component.html!text";

@Component( {
	selector: "div.task-comments",
	template: template,
	styles: [],
	directives: [
		TaskCommentComponent
	],
	host: {
		class: "ui comments"
	}
} )
export class TaskCommentsComponent implements OnInit, OnChanges {
	@Input( "task" ) task:Task;

	@ViewChild( NgForm ) private form:NgForm;

	private comments:Comment[];
	private newComment:Comment;
	private model:Comment;
	private loading:boolean;
	private active:boolean = true;

	constructor( @Inject( AuthService.Token ) private authService:AuthService.Class,
	             @Inject( TaskService.Token ) private taskService:TaskService.Class ) {
		this.resetModel();
	}

	ngOnInit():void {
		this.reloadTask( this.task );
	}

	ngOnChanges( changes:SimpleChanges ):void {
		if( changes[ "task" ] ) {
			this.reloadTask( changes[ "task" ].currentValue );
		}
	}

	private reloadTask( task:Task ):void {
		if( ! this.task || ! this.task.comments ) {
			this.comments = [];
			return;
		}

		this.comments = this.task.comments.slice( 0 );
		this.comments.sort( ( commentA:Comment, commentB:Comment ) => {
			return commentB.createdOn.getTime() - commentA.createdOn.getTime();
		} );
	}

	private resetModel():void {
		this.model = <any>{};
	}

	private resetForm():void {
		this.active = false;
		setTimeout( () => this.active = true, 0 );
	}

	private onCommentFormSubmit():void {
		if( ! this.form.form.valid ) return;

		this.createComment( this.model );
	}

	private createComment( comment:Comment ):void {
		this.loading = true;
		comment.createdOn = new Date();
		comment.author = this.authService.getAuthenticatedUser();

		this.task.comments.push( comment );

		this.taskService.save( this.task ).then( ( task:Task ) => {
			this.comments.unshift( comment );

			this.resetModel();
			this.resetForm();

			this.loading = false;

			this.newComment = comment;
			setTimeout( () => this.newComment = null, 1000 );
		} );
	}
}

export default TaskCommentsComponent;
