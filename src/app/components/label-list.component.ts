import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Label } from "app/models/label";

import template from "./label-list.component.html!text";
import style from "./label-list.component.css!text";

@Component( {
	selector: "div.label-list",
	template: template,
	styles: [
		style
	],
	directives: [],
	host: {
		class: "segment-panel"
	}
} )
export class LabelListComponent {
	@Input( "labels" ) labels:Label[];
	@Input( "selectedLabels" ) selectedLabels:Label[] = [];

	@Output( "selectedLabelsChange" ) selectedLabelsChangeEventEmitter:EventEmitter<Label> = new EventEmitter<Label>();

	constructor() {}

	private onLabelClick( label:Label ):void {
		let index:number = this.selectedLabels.indexOf( label );
		if( index !== -1 ) {
			this.selectedLabels.splice( index, 1 );
		} else {
			this.selectedLabels.push( label );
		}
	}
}

export default LabelListComponent;
