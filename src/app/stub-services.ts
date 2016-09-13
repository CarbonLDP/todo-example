import { AuthService } from "angular2-carbonldp/services";

import { ProjectService, TaskService, UserService } from "app/services";

import { StubAuthService } from "app/services/stub-auth.service";
import { StubProjectService } from "app/services/stub-project.service";
import { StubTaskService } from "app/services/stub-task.service";
import { StubUserService } from "app/services/stub-user.service";

export const STUBBED_SERVICES_PROVIDERS:any[] = [
	{
		provide: AuthService.Token,
		useClass: StubAuthService,
	},
	{
		provide: ProjectService.Token,
		useClass: StubProjectService
	},
	{
		provide: TaskService.Token,
		useClass: StubTaskService
	},
	{
		provide: UserService.Token,
		useClass: StubUserService
	}
];
