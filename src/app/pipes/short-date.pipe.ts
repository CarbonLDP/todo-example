import { Pipe, PipeTransform } from "@angular/core";

import moment from "moment";

@Pipe( { name: "shortDate" } )
export class ShortDatePipe implements PipeTransform {
	transform( value:Date ):string {
		if( ! value ) return "";

		return moment( value ).format( "D MMM YYYY" );
	}
}