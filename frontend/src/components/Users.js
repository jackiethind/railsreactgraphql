import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import UserAvatar from "./UserAvatar";
import CreateUser from "./CreateUser";
import { useState } from "react";
import User from "./User";

const GET_USERS = gql`
  {
    users {
      id
      name
      email
      postsCount
    }
  }
`;

function Users(props) {
  const [selectedUser, setSelectedUser] = useState(null);

  const updateSelectedUser = (user) => {
    setSelectedUser(user);
  };
  console.dir(selectedUser);
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  function updateUsers() {
    refetch();
  }
  if (selectedUser)
    return (
      <User
        user={selectedUser}
        selectUser={updateSelectedUser}
        updateUsers={updateUsers}
      />
    );

  return (
    <div className="flex flex-wrap items-center pb-16">
      {data.users.map((user) => (
        <div
          key={user.id}
          className="lg:w-1/3 w-full p-4 text-center inline"
          onClick={() => setSelectedUser(user)}
        >
          <UserAvatar user={user} selectedUser={selectedUser} />
        </div>
      ))}
      <div className="lg:m-4 lg:w-1/4 w-full rounded shadow-lg">
        <CreateUser onCreateUser={updateUsers} />
      </div>
    </div>
  );
}

export default Users;
