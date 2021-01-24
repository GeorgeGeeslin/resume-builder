import React, {useContext} from "react";
import Context from '../context/Context';
import { Route, Redirect} from "react-router-dom";

export default function UnauthenticatedRoute({ children, ...rest }) {
  const context = useContext(Context);
  const {userHasAuthenticated} = context.resumeContent;
  return (
    <Route {...rest}>
      {!userHasAuthenticated ? (
        children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
}