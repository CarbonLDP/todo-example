import { OpaqueToken } from "@angular/core";

import { Comment } from "app/models/comment";

export interface Class {

}

export const Token:OpaqueToken = new OpaqueToken( "CommentService" );

export default Class;
