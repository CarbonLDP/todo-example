import { Pipe, PipeTransform } from "@angular/core";

import moment from "moment";

@Pipe( { name: "fromNow" } )
export class FromNowPipe implements PipeTransform {
	transform( value:Date ):string {
		if( ! value ) return "";

		return moment( value ).fromNow();
	}
}