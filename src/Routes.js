import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Beginnings from "./containers/beginnings/Beginnings";
import NewBeginning from "./containers/beginnings/NewBeginning";
import Mirrors from "./containers/mirrors/Mirrors";
import NewMirror from "./containers/mirrors/NewMirror";
import Darkness from "./containers/darknesss/Darknesss";
import NewDarkness from "./containers/darknesss/NewDarkness";
import Filler from "./containers/fillers/Fillers";
import NewFiller from "./containers/fillers/NewFiller";
import Recommitment from "./containers/recommitments/Recommitments";
import NewRecommitment from "./containers/recommitments/NewRecommitment";
import Climax from "./containers/climaxs/Climaxs";
import NewClimax from "./containers/climaxs/NewClimax";
import Settings from "./containers/Settings";
import ChangeEmail from "./containers/ChangeEmail";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import Instructions from "./containers/Instructions";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AuthenticatedRoute path="/instructions" exact component={Instructions} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} appProps={appProps} />
      <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} appProps={appProps} />
      <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} appProps={appProps} />
      <AuthenticatedRoute path="/beginnings/new" exact component={NewBeginning} appProps={appProps} />
      <AuthenticatedRoute path="/beginnings/:id" exact component={Beginnings} appProps={appProps} />
      <AuthenticatedRoute path="/mirrors/new" exact component={NewMirror} appProps={appProps} />
      <AuthenticatedRoute path="/mirrors/:id" exact component={Mirrors} appProps={appProps} />
      <AuthenticatedRoute path="/darknesss/new" exact component={NewDarkness} appProps={appProps} />
      <AuthenticatedRoute path="/darknesss/:id" exact component={Darkness} appProps={appProps} />
      <AuthenticatedRoute path="/fillers/new" exact component={NewFiller} appProps={appProps} />
      <AuthenticatedRoute path="/fillers/:id" exact component={Filler} appProps={appProps} />
      <AuthenticatedRoute path="/recommitments/new" exact component={NewRecommitment} appProps={appProps} />
      <AuthenticatedRoute path="/recommitments/:id" exact component={Recommitment} appProps={appProps} />
      <AuthenticatedRoute path="/climaxs/new" exact component={NewClimax} appProps={appProps} />
      <AuthenticatedRoute path="/climaxs/:id" exact component={Climax} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}