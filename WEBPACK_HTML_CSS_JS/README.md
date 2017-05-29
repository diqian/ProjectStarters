# How to open
> Drag index.html into browser or double click index.html
---
## How it work?
> npm run build, will invoke a script in package.json. This script will invoke webpack, and tell it to start with app.js and merge all the dependencies which are included in app.js into one bundle.js file. 
> Then, index.html include bundle.js
---
## Notice:
> It use file protocal, not http protocal. Thus, no server included.
---
## Attention
> If you import a.js into app.js, then you have to export the code in a.js
---
## File Structure
```
.
|____dist                       (genereated by webpack)
| |____bundle.js                (included in index.html)
|____index.html                 (entry)
|____node_modules
|____package.json               (has command for starting project)
|____README.MD
|____src
| |____css
| | |____input-elements.css
| | |____main.css
| |____js
| | |____app.js
| | |____dom-loader.js

```
---
## WHY Webpack?
> Because it can minify your code, manage your dependency, add plugin and many more. 

## Step By Step -- Clone the project HTML_CSS_JS, and modify from there

1. create package.json
```
npm init
```

2. webpack is development only dependency, we won't need it for production. Also, webpack will be in your node_module folder after intallation
```
npm install webpack --save-dev  
```

3. go to package.json, add a script
...webpack -> this will target the webpack package 
...app.js  -> entry point (this is where webpack starts its journey)
...dist/bundle.js -> dist means distribution, bundle.js is the output file
```
"build":  "webpack src/js/app.js dist/bundle.js"
```
4. Now, webpack will go to app.js file, and we have to tell webpack in app.js file what app.js file depends on. And then, webpack will merge all the dependencies starting from app.js file into 1 bundle
...In order for webpack to work, now in app.js, you have to import all the files, which means, in all the imported files, you also need to export them.

```
//in dom-loader.js, export things you want to export
export var secretButton =....
export var secretParagraph = ...
```

```
//in app.js, import everything that your app.js depend on
import { secretParagraph, secretButton }'./dom_loader';
```

### Noitce
> import and export are ES6 Syntax, but for now, just by webpack, it only recognize import and export. Doesn't recognize any other ES6 syntax. Keep in mind.

```
npm run build  //this will run the script you defined in package.json
                //before you run this command, there won't be a dist folder!!
``` 

```
include bundle.js into index.html, then drag index.html into browser to open
```

### Extra -- Webpack can minify your code
> Add a script in your package.json for production, -p means production, it tells webpack to minify your code
```
"build:prod": "webpack src/js/app.js dist/bundle.js -p"
```
```
npm run build:prod  //create production minified version
```
```
Drag your index.html into browser
```
###### Notes from https://www.youtube.com/watch?v=GU-2T7k9NfI&list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os
