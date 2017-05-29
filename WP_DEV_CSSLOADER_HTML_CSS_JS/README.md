# How to open
> npm run build
---
## How it work?
> npm run build, will invoke a script in package.json. This script will invoke webpack-dev-server. In the meantime, it will process webpack.config.js which is the configration file. In config file, it will tell dev-server to start with app.js and merge all the dependencies which are included in app.js into one bundle.js file. Bundle.js will be stored in memory, thus you won't be able to see it, but you will need it in production mode (npm run build:prod). 
>
> Then, index.html include bundle.js (even bundle.js during dev mode is created in memory, the app will still run).
>
> Go to localhost:8080 to see your app.
>
> Here, we import both css files into app.js instead of index.html. We can do that becuase of css-loader and style-loader. CSS laoder allows we import css file into js file. Style laoder will take the css file and inject into our index.html. Thus, when we open the file in browser, we can still see the styles, because they are injected by webpack and laoders.
---
## Notice:
> It use the server that webpack-dev-server provoides.
---
## Attention
> If you import a.js into app.js, then you have to export the code in a.js
---
## File Structure
```
.
|____dist                       (genereated by webpack, in memory when dev mode)
| |____bundle.js                (included in index.html)
|____index.html                 (The endpoint of all files, and displayed in browser)
|____node_modules
|____webpack.config.js          (configration file for webpack)
|____package.json               (has command for starting project)
|____README.MD
|____src
| |____css  
| | |____input-elements.css     (import into app.js)
| | |____main.css               (import into app.js)
| |____js
| | |____app.js                 (entry for webpack, all js and css files are imported here, and compiled into bundle.js)
| | |____dom-loader.js          (import into app.js)

```
---
## WHY Webpack?
> Because it can minify your code, manage your dependency, add plugin and many more. 

## WHY Webpack Development Server?
> A lot things are not provided in just file protocal. e.g, automatic relaoding your application whenever your code changes. A better way of running our project and testing our project.

## Why loader?
> Loaders are modules that allow us to transform our files. Previously, we always import css files manually in index.html via link tag which is conventional. But would it be nice if we can import CSS file into JS file. (Sounds weird, but it's only purpose is to inform webpack when to import this file, not really mixing it with javascript). And it will be nice if webpack just output the compiled css file into the head section of our index.html. Furthremore, it can compile types, ES6, SCSS, SASS, and many more.


## STEP BY STEP for WEBPACK Config
### 4 main parts of webpack config
> Entry Point: tell webpack where to start it's journey
>
> OUTPUT: tell webpack should store our bundle.js
>
> MODULE LOADERS, allow us to transform our code
>
> PLUGINS

In root folder, add webpack.config.js, webpack will know to process it automatically. (this file need to export a javascript object which holds javascript configration, thus, you need to use nodejs export syntax)
```
module.exports = {};
```
Now you provide the entry
```
module.exports = {
    entry: './src/js/app.js',
};
```
Privde the output, tell it where to store it, and what to name it.
> __dirname: reserved word means current direcotry. 
> The reason we use resolve is because the output path need to an absolute path. (unlike entry path, which is relative path)
> filename: what webpack need to name this file
> publicPath: where the asset could be found

```
var path = require('path'); //this is a nodejs package, help you resolve correct path
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    }
};
```

In package.json, change the script to
```
//"build": "webpack-dev-server --entry ./src/js/app.js --output-filename ./dist/bundle.js",
//"build:prod": "webpack src/js/app.js dist/bundle.js -p"
"build": "webpack-dev-server"
"build:prod": "webpack -p"
```


## STEP BY STEP for css loaders and style loaders
```
npm install css-loader style-loader --save-dev
```
Now, we have to tell webpack to take these loaders into account when analzing our file.
Now, we need to add a module property. In there, we can confiqure how webpack should treat your modules. 
> What is modules? Modules are any things that's exported, so that other files can import such as the file dom-loader.js.
>
> Set up rules for modules, how should they be treated. It's an array of objects.
>
> test: it tells webpack what does the rule applies, it test the file extension, eg: javscript file -> "test: /\.js$/" .As you can see this regular expression test if file ends with js.
> 
> loader: tell it which laoder you apply to the javascript file, but only 1 loader
>
> use: which allow us to use multiple loaders, and specify loaders options. Also, webpack apply loader in reverse order, so in this setup, it loads css-loader first, and then, style-loader which is what we want.
>
> css-loader: only allow us to import css into javascript
>
> style-loader: take the style and add to the index.html file
```
var path = require('path'); //this is a nodejs package, help you resolve correct path
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};

```
In app.js, include css files. (We are not mixing code, we are telling webpack where to include these css files).Now we are treasting css files as modules.
```
import '../css/main.css';
import '../css/input-elements.css'
```
Now it should work properly. Webpack will now use css-loader to allow importing css into javascript. And use style-loader to make the styles take effect in index.html.







## STEP BY STEP for WEBPACK DEV-SERVER
```
npm install webpack-dev-server --save-dev
```


## Step By Step For Webpack-- Clone the project HTML_CSS_JS, and modify from there

1. create package.json
```
npm init
```

2. webpack is development only dependency, we won't need it for production. Also, webpack will be in your node_module folder after intallation
```
npm install webpack --save-dev  
```
Now, webpack will go to app.js file, and we have to tell webpack in app.js file what app.js file depends on. And then, webpack will merge all the dependencies starting from app.js file into 1 bundle
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
###### Notes from https://www.youtube.com/watch?v=8DDVr6wjJzQ&list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os&index=3