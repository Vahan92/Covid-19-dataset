import React, { Suspense } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Loader from './components/Loader';
import { ROUTES } from './containers/routes';

function Containers() {
  return (
    <div className="app">
      <div>
        <Suspense fallback={<Loader/>}>
          <BrowserRouter>
            <Switch>
              {ROUTES.map((route) => (
                <Route
                  key={route.key}
                  exact={route.exact}
                  path={`${route.path}`}
                  component={(props: any) => <route.component {...props} />}
                />
              ))}
            </Switch>
          </BrowserRouter>
        </Suspense>
      </div>
    </div>
  );
}

export default Containers;
