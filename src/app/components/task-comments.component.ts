import { Component, Input, OnInit, Inject, ViewChild } from "@angular/core";
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
export class TaskCommentsComponent implements OnInit {
	@Input( "task" ) task:Task;

	@ViewChild( NgForm ) private form:NgForm;

	private comments:Comment[];
	private model:Comment;
	private loading:boolean;

	constructor( @Inject( AuthService.Token ) private authService:AuthService.Class,
	             @Inject( TaskService.Token ) private taskService:TaskService.Class ) {
		this.resetModel();
	}

	ngOnInit():void {
		if( ! this.task.comments ) return;

		this.comments = this.task.comments.slice( 0 );
		this.comments.sort( ( commentA:Comment, commentB:Comment ) => {
			return commentB.createdOn.getTime() - commentA.createdOn.getTime();
		} );
	}

	private resetModel():void {
		this.model = <any>{};
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

			this.loading = false;
		} );
	}
}

export default TaskCommentsComponent;