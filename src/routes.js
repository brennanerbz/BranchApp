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
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRoute  component={checkLoggedIn() ? Landing : Chat}/>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
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
