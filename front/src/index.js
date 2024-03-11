/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/Modals/index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>,
);
