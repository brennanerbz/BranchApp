import React from 'react';
import {IndexRoute, Route} from 'react-router';

import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
	App,
	Landing,
	Chat,
	Common,
	GeneralFeed,
	Feed,
	NotFound
} from 'containers';

export default(store) => {
	const requireLogin = (nextState, replaceState, cb) => {
		function checkAuth() {
			const { auth: { user }} = store.getState();
			if(!user) {
				replaceState(null, '/')
			}
			cb()
		}

		if(!isAuthLoaded(store.getState())) {
			store.dispatch(loadAuth()).then(checkAuth);
		} else {
			checkAuth()
		}
	};

	// Keep routes in alphabetical order
	return(
		<Route path="/" component={App}>
			<IndexRoute component={!isAuthLoaded(store.getState()) ? Landing : Chat}/>


			
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

*/