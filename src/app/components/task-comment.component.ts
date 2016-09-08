import { Directive, Renderer, ElementRef, Component, Input, OnInit, ViewChild, Inject, ViewChildren, QueryList } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Comment } from "app/models/Comment";
import { Task } from "app/models/Task";

import { AuthService, TaskService } from "app/services";

import { FromNowPipe } from "app/pipes/from-now.pipe";

import template from "./task-comment.component.html!text";
import style from "./task-comment.component.css!text";

@Directive( {
	selector: "textarea.reply[name=content]"
} )
class ContentTextarea implements OnInit {
	constructor( private renderer:Renderer, private elementRef:ElementRef ) {}

	ngOnInit():void {
		this.focus();
	}

	focus():void {
		this.renderer.invokeElementMethod( this.elementRef.nativeElement, "focus", [] );
	}
}

@Component( {
	selector: "div.task-comment",
	template: template,
	styles: [
		style
	],
	directives: [
		TaskCommentComponent,
		ContentTextarea
	],
	pipes: [
		FromNowPipe
	],
	host: {
		class: "comment"
	}
} )
export class TaskCommentComponent implements OnInit {
	@Input( "comment" ) comment:Comment;
	@Input( "task" ) task:Task;

	@ViewChild( NgForm ) private form:NgForm;

	@ViewChildren( ContentTextarea ) contentTextarea:QueryList<ContentTextarea>;

	private replies:Comment[];
	private replyModeEnabled:boolean = false;
	private model:Comment;
	private loading:boolean = false;

	constructor( @Inject( AuthService.Token ) private authService:AuthService.Class,
	             @Inject( TaskService.Token ) private taskService:TaskService.Class ) {
		this.resetModel();
	}

	ngOnInit():void {
		if( ! this.comment.replies ) return;

		this.replies = this.comment.replies.slice( 0 );
		this.replies.sort( ( commentA:Comment, commentB:Comment ) => {
			return commentB.createdOn.getTime() - commentA.createdOn.getTime();
		} );
	}

	private enableReplyMode():void {
		if( this.replyModeEnabled ) {
			this.contentTextarea.forEach( ( textarea:ContentTextarea ) => textarea.focus() );
			return;
		}
		this.resetModel();
		this.replyModeEnabled = true;
	}

	private disableReplyMode():void {
		this.replyModeEnabled = false;
		this.resetModel();
	}

	private resetModel():void {
		this.model = <any>{};
	}

	private onCommentFormSubmit():void {
		if( ! this.form.form.valid ) {
			this.contentTextarea.forEach( ( textarea:ContentTextarea ) => textarea.focus() );
			return;
		}

		this.createComment( this.model );
	}

	private createComment( comment:Comment ):void {
		this.loading = true;
		comment.createdOn = new Date();
		comment.author = this.authService.getAuthenticatedUser();

		this.comment.replies.push( comment );

		this.taskService.save( this.task ).then( ( task:Task ) => {
			this.replies.unshift( comment );

			this.disableReplyMode();

			this.loading = false;
		} );
	}
}

export default TaskCommentComponent;
