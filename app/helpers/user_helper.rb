module UserHelper

  def get_active_users()
    @table = []
    active_users = User.where(is_active: 'true')
    active_users.each do |user|
      myUser = user[:_id]
      if (user[:is_admin] == 'true')
        messages = Message.where(user_id: user[:_id])
      else
        messages = Message.where(user_id: user[:_id] && created_at: >= current_time)
      end
      messages.each do |item|
        active_user = {
          UserName: user[:name],
          UserId:   user[:_id].to_s,
          MessageId:           item[:_id].to_s,
          Message: item[:message],
        }
        @table.push(active_user)
      end
    end
    return @table
  end
end
