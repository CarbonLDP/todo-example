import { Task } from "app/models/task";

export interface Project {
	title:string;

	tasks?:Task[];
}
