# Angular dynamic module loading
## Angular Code Splitting & Hot Module Injection

## TODO

- [x] extend the react example to mount a react component and turn rendering over to that engine
- [ ] compile modules using ivy exposing the component factory and load with import()
- [ ] break the angular example into to two parts, one using the parent angular deps, the second providing the entire stack

## Links

- https://github.com/raphael22/whatsnext-angular
- https://blog.angularindepth.com/asynchronous-modules-and-components-in-angular-ivy-1c1d79d45bd3

### Requirements
- node >= 10

---

### How to use ?

- start app
    - ```npm run start```

- build modules
    - ```npm run build-react```
    - ```npm run build-vue```
    - module will be copy to assets
    - app will reload on copy

- navigate to **/react** or **/vue** to see lazyload on routing
- all modules main component will be lazyload into root zone container

---

### Misc

- execute ```npm run pre-rollup``` if you made change in /scripts/rollup.ts



