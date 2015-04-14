class User
  include Mongoid::Document

   has_many :message

   validates_presence_of :name, :email
   validates_uniqueness_of :name, :email, :case_sensitive => false

  field :name,               type: String, default: ""
  field :email,              type: String, default: ""
  field :password,           type: String, default: ""
  field :password_confirmation,            type: String, default: ""
  field :is_admin,           type: Boolean, default: false
  field :is_active,          type: Boolean, default: false
  field :created_at, 		 		               type: Time,   default: ->{ Time.now }
  field :updated_at, 		 		               type: Time,   default: ->{ Time.now }

end
