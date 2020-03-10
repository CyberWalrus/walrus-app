import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { callSagaTest } from '@stores/app/actions';
import { StateApp } from '@custom-types/store';

type PropsStore = {
  test: string;
};

type PropsSaga = {
  onTestSet: (value: string) => void;
};

type Props = PropsSaga & PropsStore;

export const Home: FunctionComponent<Props> = ({ test, onTestSet }: Props) => {
  const handleTestClick = (): void => {
    onTestSet('test');
  };
  return (
    <div className="home">
      {test}
      <button type="button" onClick={handleTestClick}>
        Test
      </button>
    </div>
  );
};

export default connect<{}, PropsSaga, Props>(
  (store: StateApp) => ({
    test: store.app.test,
  }),
  {
    onTestSet: callSagaTest,
  },
)(Home);
