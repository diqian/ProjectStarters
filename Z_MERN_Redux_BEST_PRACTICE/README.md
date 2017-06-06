This project has the best react practice I've ever seen.

## How it work?
This tutorial is just too good to be true.
```
https://scotch.io/tutorials/retrogames-library-with-node-react-and-redux-1-server-api-and-react-frontend
```
## File Structure (MERN Stack)
```
.
|____server.js                  (configure our express server, connect middleware, write route)
|
|____app
| |____models                   (your mongoose model)
| | |____game.js                (used in routes/game.js)
| | |____user.js
| |
| |____routes                   (you api call, and operation with mongo database)
|   |____game.js                (include models/game.js, and export to server.js)
|   |____user.js
|
|____client
| |
| |____dist                        (static assets served by express)
| | |____74496d9086d97aaeeafb3085e9957668.ttf
| | |____css
| | | |____style.css
| | |____fonts
| | | |____PressStart2P.ttf
| | |____index.html
| |
| |____src
| | |____index.js                   (entry of webpack)
| | |
| | |____routes.js
| | |____store.js
| | |
| | |____components                 component
| | | |____index.js
| | | |
| | | |____About.jsx
| | | |____AddGamePanel.jsx
| | | |____Archive.jsx
| | | |____Contact.jsx
| | | |____Form.jsx
| | | |____Game.jsx
| | | |____GamesListManager.jsx
| | | |____Home.jsx
| | | |____Login.jsx
| | | |____Modal.jsx
| | | |____Signup.jsx
| | | |____Welcome.jsx
| | |
| | |____constants                  
| | | |____auth.js
| | | |____filestack.js
| | | |____games.js
| | |
| | |____containers                 container
| | | |____index.js
| | | |
| | | |____AddGameContainer.jsx
| | | |____GamesContainer.jsx
| | |
| | |____reducers
| | | |____index.js             (reducers/index.js)
| | | |
| | | |____auth.js
| | | |____filestack.js
| | | |____games.js
| | | |____routing.js
| | |
| | |____actions
| | | |____auth.js
| | | |____filestack.js
| | | |____games.js
| | |
| | |____sagas
| | | |____index.js
| | | |
| | | |____auth.js
| | | |____filestack.js
| | | |____games.js
| | |
| | |
| | |____utils
|     |____authentication.js
|     |____authWrapper.js
|
|____config
| |____index.js
|
|____webpack-loaders.js         (export to webpack config)
|____webpack-paths.js           (export to webpack config)
|____webpack.config.js
|
|____package.json
|____README.md
|
|____yarn.lock
|____.babelrc
|____.gitignore
```


# react-retrogames

The repository refers to the articles I wrote for Scotch.io:

- [Retrogames Library with Node, React, and Redux 1: Server API and React Frontend](https://scotch.io/tutorials/retrogames-library-with-node-react-and-redux-1-server-api-and-react-frontend)
- [Build a Retrogames Archive with Node.JS, React, Redux and Redux-Saga Part2: Redux Integration.](https://scotch.io/tutorials/build-a-retrogames-archive-with-node-js-react-redux-and-redux-saga-part2-redux-integration)
- [Build a Retrogames Archive with Node.JS, React, Redux and Redux-saga Part3: Authentication](https://scotch.io/tutorials/build-a-retrogames-archive-with-node-js-react-redux-and-redux-saga-part3-authentication)

If you don't have *yarn* installed, go ahead and install it.
From npm:

```
npm install yarn -g
```

Then in the root folder run:

```
yarn
```

Check the package.json for the running scripts.

PS: Don't forget to grab Filestack API key!
