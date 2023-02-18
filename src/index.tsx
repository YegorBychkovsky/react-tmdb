import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

// export const GOOGLE_CLIENT_ID =
//   '96868219267-nsptu7so470bte5r7g205r3vb5aelf6l.apps.googleusercontent.com';
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

console.warn(process.env);
console.warn(process.env.NODE_ENV);
console.warn(process.env.REACT_APP_GOOGLE_CLIENT_ID);

console.warn(GOOGLE_CLIENT_ID);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId="96868219267-nsptu7so470bte5r7g205r3vb5aelf6l.apps.googleusercontent.com">
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
);
