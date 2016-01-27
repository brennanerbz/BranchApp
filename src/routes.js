import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth, checkAuth as checkLoggedIn} from 'redux/modules/auth';
import {
    App,
    Chat,
    Landing,
    NotFound
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkLoggedIn);
    } else {
      checkLoggedIn();
    }
  };

  /**
   * Please keep routes in alphabetical order
  return (
    <Route path="/" component={App}>
      <IndexRoute component={checkLoggedIn() ? Chat : Landing}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
  */
  return (
    {
      component: App,
      childRoutes: [

        {
          path: '/',
          getComponent: (location, cb) => {
            if (checkLoggedIn()) {
              return cb(null, Chat)
            }
            return cb(null, Landing)
          },
        }

      ]
    }
  )
};



/*

<Route onEnter={requireLogin}>
  <Route path=":common_name" component={Common}>
    <IndexRoute component={GeneralFeed}/>
    <Route path=":feed_name" component={Feed}/>
  </Route>
  <Route path="*" component={NotFound} status={404}/>
</Route>

*/
