import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(input: { id: $id }) {
      user {
        id
        name
        email
        postsCount
      }
    }
  }
`;

function DeleteUser(props) {
  const { onDeleteUser, user } = props;
  const [deleteUser, { data }] = useMutation(DELETE_USER);

  const onSubmit = (e) => {
    e.preventDefault();

    deleteUser({ variables: { id: user.id } });
    onDeleteUser();
  };

  return (
    <div className="lg:fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
      <form className="lg:px-8 pt-2 pb-2" onSubmit={(e) => onSubmit(e)}>
        <div className="lg:flex flex-wrap flex-between items-center justify-center lg:p-0 p-6">
          <h4 className="font-bold lg:pr-4">Delete user</h4>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteUser;
