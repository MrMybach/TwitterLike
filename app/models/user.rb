class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :posts
  # has_many :friends, through: :friendships
  # has_many_and_belongs_to_many :users, through: :friendships
  has_many :friendships

  def friends
    (Friendship.inverse_friends(id).map(&:user) + Friendship.direct_friends(id).map(&:friend)).uniq
  end
end