import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import template from "./not-found.view.html!text";

@Component({
    selector: "div.dashboard",
    template: template,
    styles: [],
    directives: [],
})
export class NotFoundView implements OnInit {
    constructor( private router:Router ) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.router.navigate( [ "/dashboard" ] );
        }, 2000);
    }
}

export default NotFoundView;
