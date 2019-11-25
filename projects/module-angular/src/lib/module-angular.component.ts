import { Component, OnInit } from "@angular/core";

@Component({
    selector: "lib-module-angular",
    template: `
        <p>
            module-angular {{ name }}
        </p>
    `,
    styles: [],
})
export class ModuleAngularComponent implements OnInit {
    constructor() {}

    public name: string = "BEFORE";

    ngOnInit() {}
}
