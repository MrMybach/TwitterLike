class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, class_name: 'User'

  scope :direct_friends, ->(user_id) { where user_id: user_id }
  scope :inverse_friends, ->(user_id) { where friend_id: user_id }
end
