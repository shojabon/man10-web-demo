import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {LoginPage} from "./login/LoginPage";
import {CheckIfAuthenticatedModule} from "./login/CheckIfAuthenticatedModule";
import {BrowserRouter, Route} from "react-router-dom";
import {UserPageModule} from "./user-page/UserPageModule";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <>
          <CheckIfAuthenticatedModule/>
          <BrowserRouter>
              <Route path="/login"><LoginPage/></Route>
              <Route path="/u/:id"><UserPageModule/></Route>
          </BrowserRouter>
      </>
  </React.StrictMode>
);

