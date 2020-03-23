
# vue create
```
cd ~/IdeaProjects/iwaki-onion-architecture-for-vuejs
vue create onion-architecture-webapp
```

# manual
```
Vue CLI v3.12.0
┌───────────────────────────┐
│  Update available: 4.1.2  │
└───────────────────────────┘
? Please pick a preset: 
  default (babel, eslint) 
❯ Manually select features 
```

# full set
```
┌───────────────────────────┐
│  Update available: 4.1.2  │
└───────────────────────────┘
? Please pick a preset: Manually select features
? Check the features needed for your project: 
 ◉ Babel
 ◉ TypeScript
 ◉ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◉ Unit Testing
❯◉ E2E Testing
```

# choose setting
```
Vue CLI v3.12.0
┌───────────────────────────┐
│  Update available: 4.1.2  │
└───────────────────────────┘
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, PWA, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
? Pick a unit testing solution: Jest
? Pick a E2E testing solution: Nightwatch
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```

# first run serve
```
cd ~/IdeaProjects/iwaki-onion-architecture-for-vuejs/onion-architecture-webapp
yarn test:unit
yarn serve
```

# additional modules
```
yarn add axios axios-mock-adapter
yarn add element-ui
yarn add vue-js-modal
yarn add nedb-promises
yarn add @vue/composition-api # vue 3.x Composition API
```
