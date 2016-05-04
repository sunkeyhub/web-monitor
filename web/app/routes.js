import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import App from './containers/App';
import FooContainer from './containers/FooContainer';
import Bar from './components/Bar';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={FooContainer} />
        <Route path="bar" component={Bar} />
    </Route>
);

export default routes;
