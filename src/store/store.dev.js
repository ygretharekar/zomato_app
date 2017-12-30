import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

export default initialState => createStore(
	reducers,
	initialState,
	composeWithDevTools(
		applyMiddleware(
			thunk,
			reduxImmutableStateInvariant()
		)
	)
);

