import React, { FunctionComponent } from 'react';

import Footer from '@components/footer/footer';

import './app.scss';

export const App: FunctionComponent = () => {
  return (
    <div className="app">
      Hello
      <Footer />
    </div>
  );
};

export default App;
