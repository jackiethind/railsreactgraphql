import React from "react";
import { useState } from "react";
import Gravatar from "react-gravatar";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(input: { id: $id, name: $name, email: $email }) {
      user {
        id
        name
        email
        postsCount
      }
    }
  }
`;

function UserAvatar({ user, updateUsers, selectedUser }) {
  const [state, setState] = useState(user);
  const [disabled, setDisabled] = useState(true);

  const [updateUser, { data }] = useMutation(UPDATE_USER);
  console.dir(selectedUser);
  const onSubmit = (e) => {
    e.preventDefault();
    updateUser({ variables: state });
    setDisabled(true);
    updateUsers();
  };
  return (
    <div>
      <Gravatar
        email={user.email}
        size={200}
        className="rounded-full text-center inline"
      />
      <div className="px-6 py-4">
        <form className="lg:px-8 pt-2 pb-2" onSubmit={(e) => onSubmit(e)}>
          <div className="font-bold text-xl mb-2">
            {selectedUser ? (
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                value={state.name}
                placeholder="Name"
                onChange={(e) => {
                  setState({ ...state, name: e.target.value });
                  setDisabled(false);
                }}
              />
            ) : (
              user.name
            )}
          </div>
          {selectedUser ? (
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={state.email}
              placeholder="Email"
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
                setDisabled(false);
              }}
            />
          ) : (
            <p className="text-gray-500 text-sm">{user.email} </p>
          )}{" "}
          <p className="text-gray-500 text-base">{user.postsCount}</p>
          {selectedUser && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
              style={{ backgroundColor: disabled && "grey" }}
            >
              Update User
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserAvatar;
