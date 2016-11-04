#HANGMAN GAME TUTORIAL

* Create package.json file by running npm init -y

* Install dependencies locally
npm install --save react react-dom style-loader css-loader

* Install dev dependencies locally.
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-dev-server react-bootstrap bootstrap@3

* Create public folder.
  Add index.html to public folder.
```
<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
   <title>Hangman Game</title>
 </head>
 <body>
   <div id="root"></div>
   <script type="text/javascript" src="bundle.js"></script>
 </body>
</html>
```

* Create src folder.
* Create index.js file in src folder.
```javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './components/App';
import './styles/index.css';

render(
  <App />,
  document.getElementById('root')
);
```

* Create styles folder in src directory and add index.css into it.

* Create components folder.
Add App.js file in components folder:

```javascript
import React from 'react';

function App() {
  return (
    <div>
      <h1 className="text-center">Hangman Game</h1>
    </div>
  );
}

export default App;
```

* Create webpack.config.js file in root directory:

```
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style!css!" }
    ]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  }
};
```

* Add start script to package.json file.
```
"scripts": {
  "start": "node_modules/.bin/webpack-dev-server --progress"
},
```

* Add .gitignore file:
```
node_modules
.DS_Store
npm-debug.log
```

* Run `npm start` and visit http://localhost:8080/
