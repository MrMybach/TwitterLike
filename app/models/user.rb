class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :posts
  has_many :friendships

  has_attached_file :avatar, styles: { thumb: '100x100#', medium: '400x400>' }, :default_url => "/images/:style/darth_vader_dummy_avatar.jpg"
  validates_attachment :avatar, content_type: { content_type:['image/jpeg', 'image/gif', 'image/png'] },
  size: { less_than: 3.megabytes }

  def friends
    (Friendship.inverse_friends(id).map(&:user) + Friendship.direct_friends(id).map(&:friend)).uniq
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end