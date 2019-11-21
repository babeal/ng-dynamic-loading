# Angular dynamic module loading
## Angular Code Splitting & Hot Module Injection

- forked from https://github.com/raphael22/whatsnext-angular

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
