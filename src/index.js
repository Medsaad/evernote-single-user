import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyCXrO-XJ3FxN80BRK1mUdkHfdlmlyi7DZU",
  authDomain: "evernote-single-user.firebaseapp.com",
  databaseURL: "https://evernote-single-user.firebaseio.com",
  projectId: "evernote-single-user",
  storageBucket: "evernote-single-user.appspot.com",
  messagingSenderId: "201323557201",
  appId: "1:201323557201:web:12e2cab280c7405a08e370"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

serviceWorker.unregister();
