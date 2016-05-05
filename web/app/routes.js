import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import App from './components/App';
import IndexPage from './components/pages/IndexPage';
import FooContainer from './components/blocks/FooContainer';
import GeneralSection from './components/sections/index/GeneralSection';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={FooContainer} />
        <Route path="index" component={IndexPage}>
            <Route path="general" component={GeneralSection} />
        </Route>
    </Route>
);

export default routes;
