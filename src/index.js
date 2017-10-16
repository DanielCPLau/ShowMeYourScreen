import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
  ReactDOM.render(<AppContainer>
    <Provider store={store}>
      <Component />
    </Provider>
  </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

module.hot.accept('./App', () => {
  render(App)
});


