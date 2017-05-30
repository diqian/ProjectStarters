# How to open
> npm run build
---
## How it work?
> npm run build, will invoke a script in package.json. This script will invoke webpack-dev-server. In the meantime, it will process webpack.config.js which is the configration file. In config file, it will tell dev-server to start with app.js and merge all the dependencies which are included in app.js into one bundle.js file. Bundle.js will be stored in memory during development mode, thus you won't be able to see it, but you will need it in production mode (npm run build:prod). 
>
> Now, with babel-laoder, webpack go into app.js, and fetch all the js files and transpile them into ES5, and babel laoder uses rules "preset ES2015", so it know its is transpiling ES2015(ES6) into ES5, and resulted in bundle.js
>
> With Sass-loader, webpack go into app.js, and featch all the scss files, and transpile scss to css files, and then, use css-loader to allow importing css into js files, and then, use extractTextPlugin to extract css files into main.css (in dist folder)
>
> Then, index.html include bundle.js (even bundle.js during dev mode is created in memory, the app will still run). And index.html also need to include main.css file.
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
|____dist                            (genereated by webpack, in memory when dev mode)
| |____bundle.js                     (included in index.html)
| |____main.css                      (included in index.html)
|____index.html                      (include main.css, bundle.js)
|____package.json                    (where we can find starting script)
|____README.md
|____src
| |____css
| | |_____colors.scss                (store scss color variable)
| | |____main.scss                   (include _colors.scss)
| |____js
| | |____app.js                      (entry for webpack, include main.scss, and other js files)
| | |____random-generator.js         (exporting code for app.js to include)
|____webpack.config.js

```
---
## WHY Webpack?
> Because it can minify your code, manage your dependency, add plugin and many more. 

## WHY Webpack Development Server?
> A lot things are not provided in just file protocal. e.g, automatic relaoding your application whenever your code changes. A better way of running our project and testing our project.

## Why loader?
> Loaders are modules that allow us to transform our files. Previously, we always import css files manually in index.html via link tag which is conventional. But would it be nice if we can import CSS file into JS file. (Sounds weird, but it's only purpose is to inform webpack when to import this file, not really mixing it with javascript). And it will be nice if webpack just output the compiled css file into the head section of our index.html. Furthremore, it can compile types, ES6, SCSS, SASS, and many more.



## STEP BY STEP for including dependencies
In app.js
```
import { RandomGenerator } from './random-generator';
```
In main.scss (Notice: we import colors, not _colors.scss. The extension and the leading underscore is omitted. SCSS knows how to handle the output.)
```
@import "colors";  //don't forget semicolon!!!
```
In app.js, import main.scss file (it sounds strange to import css into javascript, this is just how webpack works). In the end, it will not put the css into javascript. What happends is when webpack analyze app.js, and hit scss files, it will use the correct loaders, so that webpack can pull out the scss, and put it into the header of the index.html.
```
import '../css/main.scss';
import { RandomGenerator } from './random-generator';
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



## STEP BY STEP for SCSS and ES6
> Install sass-loader because scss uses sass. Loads a SASS/SCSS file and and compiles it to CSS.
>
> Install node-sass,  is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass. It allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.
>
> css-loader: only allow us to import css into javascript
> 
> style-loader: extract css and inject into the header of index.html (we are not using it here)
> 
> extract-text-webpack-plugin: allow us to get all the compiled css code, and put into its own file, so that we can just import a seperate file holding our css files
```
npm install sass-loader node-sass css-loader extract-text-webpack-plugin --save-dev
```
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
Enable SCSS to CSS
Test for SCSS extension. And then, extract the compiled css file into a seperate file.
> First, require our plugin, instainiate and configure it. First, confiqure the filename which is the output filename for the compiled css file, here, we want the output file to be named 'main.css'. You can name whatever you want.
>
> Now, in rules, use call the extract method from the plugin object, and tell it to use what loaders. Notice, the element will be the first loader gets applied. So we first parse the scss code and transpiled into css , and then applied css-laoder to allow importing css into javascript, 
```
var path = require('path'); //this is a nodejs package, help you resolve correct path
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

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
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    }
};
```
With the above set up, we told extractPlugin what to extact, but in order to use it, we need plugin modules. And plugin is an array, which will run our outputted file through.
```
var path = require('path'); //this is a nodejs package, help you resolve correct path
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

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
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractPlugin
    ]
};
```
Now we have to change index.html file. Because we know bundle.js and main.css file will both be placed into the dist folder. 
> Thus, in header, you add
```
<link rel="stylesheet" href="dist/main.css">
```
and before </body> include
```
<script src="dist/bundle.js"></script>
```

```
npm run build // start developement mode
```
```
go to localhost:8080
```









## STEP BY STEP for Plugin (Not applied here)

Say now, we want to confiqure the minification plugin that came with webpack.
1. plugin: is an array
2. new webpack : we need to inistiaate 
3. now, if we don't pass any configuration to it, it will just minify everything for us. So now, in both dev mode or prod mode, code is minified.  (Don't include this plugin config file if you don't want your code to be minified during production mode)
```
var path = require('path'); //this is a nodejs package, help you resolve correct path
var webpack = require('webpack'); 
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
    },
    plugin: [
        new webpack.optimize.UgligyJsPlugin({
        })
    ]
};
```




## STEP BY STEP for WEBPACK DEV-SERVER
```
npm install webpack-dev-server --save-dev
```



## Step By Step For Webpack -- and modify from there

1. create package.json
```
npm init //npm init -y, say yes to all the questions
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


###### Notes from https://www.youtube.com/watch?v=8vnkM8JgjpU&list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os&index=4