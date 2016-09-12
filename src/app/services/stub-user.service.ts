import { Injectable } from "@angular/core";

import { User } from "app/models/user";

import * as UserService from "app/services/user.service";

@Injectable()
export class StubUserService implements UserService.Class {
	private users:User[];

	constructor() {
		this.users = [
			{
				"name": "Matt Tennant",
				"avatar": "https://randomuser.me/api/portraits/men/44.jpg"
			},
			{
				"name": "Donna Smith",
				"avatar": "https://randomuser.me/api/portraits/women/49.jpg"
			},
			{
				"name": "Rose Jones",
				"avatar": "https://randomuser.me/api/portraits/women/65.jpg"
			},
			{
				"name": "Clara Pond",
				"avatar": "https://randomuser.me/api/portraits/women/74.jpg"
			},
			{
				"name": "Amy Oswald",
				"avatar": "https://randomuser.me/api/portraits/women/88.jpg"
			},
			{
				"name": "Rory Tyler",
				"avatar": "https://randomuser.me/api/portraits/men/61.jpg"
			},
			{
				"name": "Raj Cooper",
				"avatar": "https://randomuser.me/api/portraits/men/39.jpg"
			},
			{
				"name": "John Kowalski",
				"avatar": "https://randomuser.me/api/portraits/men/46.jpg"
			},
			{
				"name": "Eduardo Zamora",
				"avatar": "https://randomuser.me/api/portraits/men/51.jpg"
			},
			{
				"name": "Orlando Shumacher",
				"avatar": "https://randomuser.me/api/portraits/men/49.jpg"
			},
			{
				"name": "Jeff Grassi",
				"avatar": "https://randomuser.me/api/portraits/men/40.jpg"
			},
			{
				"name": "Yong Linsey",
				"avatar": "https://randomuser.me/api/portraits/men/10.jpg"
			},
			{
				"name": "Ben Mariner",
				"avatar": "https://randomuser.me/api/portraits/men/57.jpg"
			},
			{
				"name": "Reggie Polson",
				"avatar": "https://randomuser.me/api/portraits/men/57.jpg"
			},
			{
				"name": "Loyd Stefaniak",
				"avatar": "https://randomuser.me/api/portraits/men/59.jpg"
			},
			{
				"name": "Elene Wojcik",
				"avatar": "https://randomuser.me/api/portraits/women/54.jpg"
			},
			{
				"name": "Rosenda Murrow",
				"avatar": "https://randomuser.me/api/portraits/women/56.jpg"
			},
			{
				"name": "Cheryl Bartolomeo",
				"avatar": "https://randomuser.me/api/portraits/women/84.jpg"
			},
			{
				"name": "Charita Cardamone",
				"avatar": "https://randomuser.me/api/portraits/women/57.jpg"
			},
			{
				"name": "Myrtice Sirmons",
				"avatar": "https://randomuser.me/api/portraits/women/58.jpg"
			}
		];
	}

	getAll():Promise<User[]> {
		return new Promise( ( resolve:( result:User[] ) => void, reject:() => void ) => {
			setTimeout( () => {
				resolve( this.users.slice( 0 ) );
			}, 2000 );
		} );
	}
}
