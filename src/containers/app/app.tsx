import React, { FunctionComponent, ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import routes from '@constants/routes';

import './app.scss';

export const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path={routes.home.root} render={(): ReactElement => <div>Home</div>} />
        <Route path={routes.info.root} render={(): ReactElement => <div>Info</div>} />
        <Redirect to={routes.home.root} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
