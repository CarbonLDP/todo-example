import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";

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
export class LabelListComponent implements OnChanges {
	@Input( "loading" ) loading:boolean = false;
	@Input( "labels" ) labels:Iterable<Label>;
	@Input( "selectedLabels" ) selectedLabels:Label[] = [];

	@Output( "selectedLabelsChange" ) selectedLabelsChange:EventEmitter<Label[]> = new EventEmitter<Label[]>();

	constructor() {}

	ngOnChanges( changes:SimpleChanges ):void {
		if( changes[ "labels" ] ) {
			let newLabels:Label[] = changes[ "labels" ].currentValue;

			this.selectedLabels = this.selectedLabels
				.map( ( selectedLabel:Label ) => newLabels.find( ( newLabel ) => selectedLabel.name === newLabel.name ) )
				.filter( ( selectedLabel:Label ) => ! ! selectedLabel );
			this.selectedLabelsChange.emit( this.selectedLabels );
		}
	}

	private onLabelClick( label:Label ):void {
		let index:number = this.selectedLabels.indexOf( label );
		if( index !== - 1 ) {
			this.selectedLabels.splice( index, 1 );
		} else {
			this.selectedLabels.push( label );
		}

		this.selectedLabelsChange.emit( this.selectedLabels );
	}
}

export default LabelListComponent;
