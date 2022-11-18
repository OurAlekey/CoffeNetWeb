import React, { useEffect, useState } from "react";
import { Route, withRouter, useLocation } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/Login";
import { Error } from "./pages/Error/Error";
import { NotFound } from "./pages/NotFound/NotFound";
import { Access } from "./pages/Access/Access";

import useAuthExpired from "./hooks/useAuthExpired";

export const ctx = React.createContext();

const AppWrapper = (props) => {
  const isAuth = useAuthExpired();
  const [colorScheme, setColorScheme] = useState("light");

  switch (props.location.pathname) {
    case "/login":
      try {
        if (isAuth) {
          return <App setColorScheme={setColorScheme} />;
        } else {
          return (
            <Route
              path="/login"
              render={() => <Login colorScheme={colorScheme} />}
            />
          );
        }
      } catch (err) {
        window.location = "#/login";
      }

    case "/error":
      return (
        <Route
          path="/error"
          render={() => <Error colorScheme={colorScheme} />}
        />
      );
    case "/notfound":
      return (
        <Route
          path="/notfound"
          render={() => <NotFound colorScheme={colorScheme} />}
        />
      );
    case "/access":
      return (
        <Route
          path="/access"
          render={() => <Access colorScheme={colorScheme} />}
        />
      );
    default:
      return <App setColorScheme={setColorScheme} />;
  }
};

export default withRouter(AppWrapper);
