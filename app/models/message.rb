class Message
  include Mongoid::Document

   belongs_to :user

   validates_presence_of :message, ip_address

  field :message,               type: String, default: ""
  field :ip_address,            type: String, default: ""
  field :created_at, 		 		               type: Time,   default: ->{ Time.now }
  field :updated_at, 		 		               type: Time,   default: ->{ Time.now }

end
