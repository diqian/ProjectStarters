# How to open
> npm run build    
---
## How it work?
> npm run build, will invoke a script in package.json. This script will invoke webpack-dev-server. In the meantime, it will process webpack.config.js which is the configration file. In config file, it will tell dev-server to start with app.js and merge all the dependencies which are included in app.js into one bundle.js file. Bundle.js will be stored in memory during development mode, thus you won't be able to see it, but you will need it in production mode (npm run build:prod). 
>
> Now, with babel-loadder, webpack go into app.js, and fetch all the js files and transpile them into ES5, and babel laoder uses rules "preset ES2015", so it know its is transpiling ES2015(ES6) into ES5, and resulted in bundle.js
>
> With react preset, all your JSX code could be parsed successfully.
>
> Then, index.html include bundle.js (even bundle.js during dev mode is created in memory, the app will still run).
>
> Notice here, in index.html, we have a div with id="root", which is the entry for react code. In src/app.js, react will target this root, and add inject all the react code in there.
>
> Go to localhost:8080 to see your app.
---
> npm run build:prod, will run the production versin which has minified code, and you will see the genereated dist folder.
---
## Notice:
> It use the server that webpack-dev-server provoides.
---
## File Structure
```
.
|____dist                           (genereated by webpack)
| |____bundle.js                    (included in index.html)
|____index.html
|____package.json
|____README.md
|____src
| |____app.js                       (entry for webpack, include other components)
| |____components
| | |____Images.js                  (react components, exporting for app.js to include)
|____webpack.config.js

```
---
## WHY REACT?
> Fast, easy to use, It makes writing Javascript easier, Components are the future of web development, Bonus: Mobile Apps using React Native
>
>ReactDOM is used to interact with the actual DOM while React is used to create and manage our components.

## WHY Webpack?
> Because it can minify your code, manage your dependency, add plugin and many more. 

## WHY Webpack Development Server?
> A lot things are not provided in just file protocal. e.g, automatic relaoding your application whenever your code changes. A better way of running our project and testing our project.

## Why loader?
> Loaders are modules that allow us to transform our files. Previously, we always import css files manually in index.html via link tag which is conventional. But would it be nice if we can import CSS file into JS file. (Sounds weird, but it's only purpose is to inform webpack when to import this file, not really mixing it with javascript). And it will be nice if webpack just output the compiled css file into the head section of our index.html. Furthremore, it can compile types, ES6, SCSS, SASS, and many more.

## STEP BY STEP for setup

```
npm init -y
```

```
npm i -S react
npm i -S react-dom
```
Include Webpack
```
npm i -D webpack
```
Allowing your code to be transpiled into ES5
```
npm i -D babel-core
npm i -D babel-loader
```

Get react preset, so babel know how to transform react code into ES5
```
npm i -D babel-preset-react
```

So unlock us the ES6 features
```
npm i -D babel-preset-es2015
```


## STEP BY STEP for WEBPACK Config
### 4 main parts of webpack config
> Entry Point: tell webpack where to start it's journey
>
> OUTPUT: tell webpack should store our bundle.js
>
> MODULE LOADERS, allow us to transform our code
>
> PLUGINS: almost same as loader, but again, they are really different. Loaders are applied on a per-file basis. eg. we use test: /\.css$/ to check css files and on every css files, we apply these laoders to transform the code or load it correctly. A plugin is then applied to your bundle before you output. If you have some transformation that you want apply to all your code, a plugin is what you are looking for. For exmaple: minificaition plugin.

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
> __dirname: reserved word means absolute path for current direcotry. 
> The reason we use resolve is because the output path need to an absolute path. (unlike entry path, which is relative path)
> filename: what webpack need to name this file
> publicPath: where the asset could be found for webpack

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
build: is for develipemnt version
build:prod: is for production version, which will minify the code. 
```
//"build": "webpack-dev-server --entry ./src/js/app.js --output-filename ./dist/bundle.js",
//"build:prod": "webpack src/js/app.js dist/bundle.js -p"
"build": "webpack-dev-server"
"build:prod": "webpack -p"
```


## STEP BY STEP for ES6 and REACT
Enable ES6, notice, although webpack understand ES6, it doesn't transform your code into ES5, so older browser won't understand your ES6 code
> Install babel, which is a transpiler to tranlate ES6 to ES5
>
> babel-loader: enable the webpack flow for bebel to do its job 
>
> babal-core: it does the translation
>
> babel-preset-es2015: this is rule for babel, tell what feature we want babel to be able to compile, this unlock all the ES6 features
```
npm install babel-core babel-loader babel-preset-es2015 --save-dev
```
Now, we have to tell webpack to take these loaders into account when analzing our file.
First, we need to add a module property. In there, we can confiqure how webpack should treat your modules. 
> What is modules? Modules are any things that's exported, so that other files can import such as the file random-generator.js.
>
> Set up rules for modules, how should they be treated. It's an array of objects.
>
> test: it tells webpack what does the rule applies, it test the file extension, eg: javscript file -> "test: /\.js$/" .As you can see this regular expression test if file ends with js. And now we tell all the js file should be compiled into ES5.
> 
> loader: tell it which laoder you apply to the javascript file, but only 1 loader
>
> use: which allow us to use multiple loaders, and specify loaders options. Also, webpack apply loader in reverse order, so in this setup, it loads css-loader first, and then, style-loader which is what we want.
>
> Now, we want to transform ES6 to ES5, thus we test on js files, and use loader with option of presets to es2015. 
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
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
        ]
    }
};
```
Add react JSX support
```
npm i -D babel-preset-react
```
Now add the preset into webpack config
```
var path = require('path')

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015']
                        }
                    }
                ]
            },
        ]
    }
}
```



## Step By Step For Webpack

1. create package.json
```
npm init //npm init -y, say yes to all the questions
```

2. webpack is development only dependency, we won't need it for production. Also, webpack will be in your node_module folder after intallation
```
npm install webpack --save-dev  
```
Now, webpack will go to app.js file, and we have to tell webpack in app.js file what app.js file depends on. And then, webpack will merge all the dependencies starting from app.js file into 1 bundle



### Noitce
> import and export are ES6 Syntax, but for now, just by webpack, it only recognize import and export. Doesn't recognize any other ES6 syntax. Keep in mind. But with Babel, ES6 syntax is finally fully supported.

###### Notes from https://www.youtube.com/watch?v=WOTFmPkWbxo