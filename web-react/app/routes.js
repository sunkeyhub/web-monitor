import React from 'react';
import { Route, IndexRedirect, Link } from 'react-router';

import App from './components/App';
import StatPage from './components/pages/StatPage';
import OverviewSection from './components/sections/stat/routes/OverviewSection';
import TimingSection from './components/sections/stat/routes/TimingSection';
import JsErrorSection from './components/sections/stat/routes/JsErrorSection';
import ApiErrorSection from './components/sections/stat/routes/ApiErrorSection';

const routes = (
    <Route path="/" component={App}>
        <Route path="stat" component={StatPage}>
            <Route path="overview" component={OverviewSection} />
            <Route path="timing" component={TimingSection} />
            <Route path="jsError" component={JsErrorSection} />
            <Route path="apiError" component={ApiErrorSection} />
        </Route>
        <IndexRedirect to="/stat/overview" />
    </Route>
);

export default routes;
