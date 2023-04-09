import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './component/register/Register';
import reportWebVitals from './reportWebVitals';

//i18n adında ==> i18nlanguage.js eklendi
import './internationalization/i18nlanguage'

//ROOT
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Fragment>
      <Register />
    </React.Fragment>
  </React.StrictMode>
); //end render

reportWebVitals();
