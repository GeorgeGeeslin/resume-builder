import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyResumes from "./components/MyResumes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ForgotPassword from "./components/ForgotPassword";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
          <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/forgotpassword">
        <ForgotPassword />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/resumes">
        <MyResumes />
      </AuthenticatedRoute>
    </Switch>
  );
}


