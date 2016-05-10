import React from 'react';
import { Route, IndexRedirect, Link } from 'react-router';

import App from './components/App';
import StatPage from './components/pages/StatPage';
import OverviewSection from './components/sections/stat/routes/OverviewSection';
import TimingSection from './components/sections/stat/routes/TimingSection';
import ErrSection from './components/sections/stat/routes/ErrSection';

const routes = (
    <Route path="/" component={App}>
        <Route path="stat" component={StatPage}>
            <Route path="overview" component={OverviewSection} />
            <Route path="timing" component={TimingSection} />
            <Route path="err" component={ErrSection} />
        </Route>
        <IndexRedirect to="/stat/overview" />
    </Route>
);

export default routes;
