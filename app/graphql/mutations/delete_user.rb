class Mutations::DeleteUser < Mutations::BaseMutation
  # args needed to delete user
  argument :id, ID, required: true
 

  # return portion of user
  field :user, Types::UserType, null: false
  

  def resolve(id:)
    user = User.find(id)
    user.destroy!

    {user:user}
    
  end

end