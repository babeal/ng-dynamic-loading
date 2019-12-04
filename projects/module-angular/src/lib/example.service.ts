import { Injectable } from "@angular/core";

/**
 * Both methods, provide in root and module providers, work.  I suspect
 * that providedIn root places this service in the root injector when looking at the compiled code.
 * ɵɵdefineInjectable is called and root is passed to this method but I didn't confirm whether the service
 * was found in the root injector or the child injector.
 */
@Injectable({ providedIn: "root"})
export class ExampleService {

  public getValue(): string {
    return "Value provided by Example Service";
  }
}
