import { User } from "app/models/user";
import { Task } from "app/models/task";

export interface Comment {
	author:User;

	content:string;

	createdOn:Date;

	task:Task;

	replies:Comment[];
}
