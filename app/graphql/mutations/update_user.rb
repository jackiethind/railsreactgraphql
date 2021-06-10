class Mutations::UpdateUser < Mutations::BaseMutation
   # args needed to update user
   argument :id, ID, required: true
   argument :name, String, required: true
   argument :email, String, required: true
 
   # return portion of user
   field :user, Types::UserType, null: false
  #  field :errors, [String], null: false

  def resolve(id:, name:, email: )
    user = User.find(id)
    if user.update(name: name, email: email)
      {user:user}
    # else
    #   {errors:user.errors.full_messages}
    end
  end

end