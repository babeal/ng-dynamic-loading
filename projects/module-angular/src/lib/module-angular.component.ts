import { Component, OnInit } from "@angular/core";

import { ExampleService } from "./example.service";

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
    constructor(private exampleService: ExampleService) {}

    public name: string = "INITIAL";

    ngOnInit() {
      this.name = this.exampleService.getValue();
    }
}
