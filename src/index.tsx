import React from 'react';
import { render } from 'react-dom';

import { App } from '@containers/app/app';

const init = (): void => {
  render(<App />, document.querySelector('#root'));
};

init();
