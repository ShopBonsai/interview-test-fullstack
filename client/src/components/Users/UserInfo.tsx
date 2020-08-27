import * as React from "react";

export default function UserInfoRow(props: any) {
  const {
    user: {
      email,
      logHistory: { count },
    },
    key,
  } = props;
  return (
    <tr key={key}>
      <td>{email}</td>
      <td>{count}</td>
    </tr>
  );
}
