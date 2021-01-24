import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyResumes from "./components/MyResumes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/">
        <Home />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/login">
          <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/resumes">
        <MyResumes />
      </AuthenticatedRoute>
    </Switch>
  );
}