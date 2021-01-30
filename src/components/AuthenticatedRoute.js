import React, {useContext} from "react";
import Context from '../context/Context';
import { Route, Redirect, useLocation } from "react-router-dom";


export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const context = useContext(Context);
  const {userHasAuthenticated} = context.configState;


  return (
    <Route {...rest}>
      {userHasAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}