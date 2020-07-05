import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Login from "./login";
import Register from "./register";
import Calendar from "./calendar";
import Reports from "./reports";
import NotFound from "./notfound";

/**
 * We want to redirect users in the following cases:
 *
 * - user is authenticated and requested /login or /register
 * - user is unauthenticated and did not request /login or /register
 *
 * Otherwise, continue with the current request.
 */
const AuthRoute = ({ isAuthenticated, isLoginRoute, exact, children }) => (
  <Route
    exact={exact}
    render={({ location }) => {
      if (isAuthenticated && isLoginRoute) {
        return <Redirect to="/" />;
      }

      if (!isAuthenticated && !isLoginRoute) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }

      return children;
    }}
  />
);

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return isLoading ? null : (
    <Router>
      <Switch>
        <AuthRoute path="/login" isAuthenticated={isAuthenticated} isLoginRoute>
          <Login />
        </AuthRoute>
        <AuthRoute
          path="/register"
          isAuthenticated={isAuthenticated}
          isLoginRoute
        >
          <Register />
        </AuthRoute>
        <AuthRoute path="/reports" isAuthenticated={isAuthenticated}>
          <Reports />
        </AuthRoute>
        <AuthRoute path="/" exact isAuthenticated={isAuthenticated}>
          <Calendar />
        </AuthRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
