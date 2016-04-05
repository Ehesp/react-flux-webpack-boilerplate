# Webpack + ReactJS

This repository is a basic example of a ReactJS application, built with [Webpack](https://webpack.github.io) and [ReactJS](https://facebook.github.io/react/index.html).  It's aim is to be simple & highly configurable, with no crazy opinionated structure. This is not an isomorphic structure, it works purely on the client side with a simple [Express](http://expressjs.com) based server running on the backend (for development, or production if needed).

## Setup

1. Clone the repository.
2. Install the project dependencies: `npm install`.
3. Run the development setup: `npm run dev`.
4. View the application on `http://localhost:3000`.

You'll see that a very basic application is in place, which allows you to navigate to another route and add text, which saves to local storage.

## How it works

The project is built using ES6/7, over ES5... But don't worry, Webpack has been setup with Babel 6 to handle this for you.

The files you'll mostly be concerned with are located within `./src`. Here you'll see a number of files:

#### index.html

This is the base entry point of your application, for both development and production. Change this to your will, but make sure you keep the `root` div, and the script which is importing your entire React application.

#### index.js

This is the base JavaScript entry point of your application. Here, we use [React Router](https://github.com/rackt/react-router) to load in our components/routes.

#### routes.js

Here we export our React Router routes config. A helper has been created called `GenerateRoute` (see below) which allows us to quickly pass in route names and the route component, along with any child routes.

The `GenerateRoute` function takes arguments, as an object:
- index (boolean): Whether the route is an [IndexRoute](https://github.com/rackt/react-router/blob/master/docs/guides/basics/IndexRoutes.md). Used when you can have multiple children of a route.
- key (string): Required when `index` is true, used to give a unique identifier to the IndexRoute.
- paths (array): An array of strings, which are your routing paths. For params, use `:`, e.g. `/user/:userId`, which can then be accessed via the component props, e.g. `this.props.params.userId`.
- component (component): A ReactJS component.
- children (array): An array of `GenerateRoute` functions, but the routes will be generated as sub-routes of the parent.

```javascript
{ GenerateRoute({
    paths: ['/profile', '/account'],
    component: require('./pages/account/Index'),
    children: [
        GenerateRoute({
            key: 'account-index',
            index: true,
            component: require('./pages/account/Overview')
        }),
        GenerateRoute({
            paths: ['billing'],
            component: require('./pages/account/Billing')
        })
    ]
}) }
```

### Managing State (Flux)

The suggested way of managing your applications state is [Flux](https://facebook.github.io/flux). Since Flux is pretty confusing, this application uses a Flux wrapper library called [Alt](http://alt.js.org),
 which makes Flux much simpler to understand and work with.

Basically Alt requires `Actions` to send information (in our example text from the input box) into a specific method in our `Store`. The Store updates it's state, which triggers an event.
Any components listening for a store event (e.g. `UserStore.listen(this.someMethod)`) will trigger the function. In our case updating the array of users on the components state.

There's not much point in explaining more, visit the [documentation](http://alt.js.org/guide) for more information on Alt.

> For users wanting [Redux](https://github.com/rackt/redux), it should be pretty straight forward to implement yourselves.

### Images/CSS

Any images should be placed within the `src/assets/images` directory, and required so Webpack can minify and cache bust them for you.

There's a handy `<Image />` component within `src/components/Image` which handles this for you, used like so:

```javascript
import { Image } from 'components';

...

<Image file="react-logo.png" alt="React Logo" style={{ width: 100 }} />
```

Any CSS is loaded in using a `css-loader`. A good place to include it in your project would be in the `src/index.js` file, for example:

```javascript
import 'bootstrap/css/bootstrap.css';
```

### Development vs Production

Development: `npm run dev`.

In development, component updates are changed on the fly (known as hot-reloading) using websockets. All files are stored 'in memory' too.

Production: `npm run prod`.

In production, Webpack bundles your files into a single file, compressed and without hot-reloading. The contents of which are within `build`. The bundle name is hashed on each build (if something has changed),
 to stop browsers caching the bundle even if it's been changed. This also applies for your images.
 
The bundled, minified production ReactJS script will also be used, which does not produce any errors.

## Misc

#### Changing ports

Simply change the numbers in `server.js`, or with production add `PORT=1234` as an environment variable.

#### LESS/SASS

These aren't handled by default, you'll need to configure Webpack yourselves using a loader, e.g. [less-loader](https://github.com/webpack/less-loader).

#### Environment Detection

If you need to detect the working environment within your code, simply use the process as you would in a Node application:

```
if (process.env.NODE_ENV === 'development')
    // Developing
if (process.env.NODE_ENV === 'production')
    // Production build
```
