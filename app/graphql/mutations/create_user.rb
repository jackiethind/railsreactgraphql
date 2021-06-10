class Mutations::CreateUser < Mutations::BaseMutation
  # args needed to create user
  argument :name, String, required: true
  argument :email, String, required: true

  # return portion of user
  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(name:, email: )
    user = User.new(name: name, email: email)

    if user.save #if successful on user creation
      {
        user: user,
        errors: []
      }
    else 
      {
        user: nil,
        errors: user.errors.full_messages # built in rails handler
      }
    end
    
  end

end