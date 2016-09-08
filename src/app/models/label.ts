import { Task } from "app/models/task";

export interface Label {
	name:string;
	tasks?:Task[];
}
