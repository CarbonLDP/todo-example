import { Comment } from "app/models/comment";
import { Label } from "app/models/label";
import { Project } from "app/models/project";
import { User } from "app/models/user";

export interface Task {
	assignedTo?:User;

	title:string;
	description:string;

	project:Project;

	dueDate:Date;

	labels?:string[];
	comments?:Comment[];
}
