import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Beginnings from "./containers/beginnings/Beginnings";
import NewBeginning from "./containers/beginnings/NewBeginning";
import Settings from "./containers/Settings";
import ChangeEmail from "./containers/ChangeEmail";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} appProps={appProps} />
      <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} appProps={appProps} />
      <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} appProps={appProps} />
      <AuthenticatedRoute path="/beginnings/new" exact component={NewBeginning} appProps={appProps} />
      <AuthenticatedRoute path="/beginnings/:id" exact component={Beginnings} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}