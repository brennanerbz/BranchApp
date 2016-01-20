# Branch App

This is the Fat-Client-Side for Branch, a messaging app that allows users to branch off into sub-topics by hashtags.

## Installation

```npm i```


## Running Development

```npm run dev```


## Building and Running Production 

```npm run build```
```npm run start```


## Deployment on Heroku 

To get this project to work on Heroku, you need to:

1. Remove the `"PORT": 8080` line from the `betterScripts` / `start-prod` section of `package.json`.
2. `heroku config:set NODE_ENV=production`
3. `heroku config:set NODE_PATH=./src`
4. `heroku config:set NPM_CONFIG_PRODUCTION=false`
  * This is to enable webpack to run the build on deploy.

The first deploy might take a while, but after that your `node_modules` dir should be cached.

