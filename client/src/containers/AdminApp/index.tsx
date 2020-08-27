import * as React from "react";

import { useQuery } from "@apollo/client";

import Login from "../../components/AdminLogin";
import Users from "../../components/Users";
import AdminNav from "../../components/AdminNav";
import { IS_LOGGED_IN } from "../../apollo/operations/queries";

import "./styles.css";

const App: React.FC = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  return (
    <div className="admin-app-root">
      {isLoggedIn ? (
        <div>
          <AdminNav />
          <Users />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
