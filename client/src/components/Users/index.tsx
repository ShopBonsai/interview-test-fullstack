import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { Table } from "reactstrap";

import UserInfoRow from "./UserInfo";

export const GET_USERS = gql`
  query GetUsers {
    users {
      email
      logHistory {
        count
      }
    }
  }
`;

export default function Users() {
  const { data, error, loading } = useQuery<any, any>(GET_USERS);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>An error occurred</p>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Email</th>
          <th>Login Count</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.users.length &&
          data.users.map((user: any) => (
            <UserInfoRow key={user._id} user={user} />
          ))}
      </tbody>
    </Table>
  );
}
