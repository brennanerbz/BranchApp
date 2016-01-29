import React from 'react';
import cookie from 'react-cookie';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, loadAuthCookie } from 'redux/modules/auth';
import {
    App,
    Chat,
    Landing,
    Index,
    NotFound
  } from 'containers';

export default (store) => {
  const checkLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuthCookie()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /*
  Please keep routes in alphabetical order
  */
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path=":branch_name" component={Chat}>
        <Route path=":feed_name" component={Chat}/>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
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
{
      component: App,
      childRoutes: [
        {
          onEnter: checkLogin,
          childRoutes: [
            {
              path: '/',
              getComponent: (location, cb) => {
                return cb(null, Chat)
              },
            }
          ]
        }
      ]
    }

*/
