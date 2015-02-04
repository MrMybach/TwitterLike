class Post < ActiveRecord::Base
  belongs_to :user
  validates :text, presence: true, length: {minimum: 2, maximum: 140}
  belongs_to :parrent, class_name: 'Post'
end
