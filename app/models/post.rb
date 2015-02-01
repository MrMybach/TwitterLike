class Post < ActiveRecord::Base
  belongs_to :user
  # validates :title, presence: true - Ususnąć podczas następnej migracji
  validates :text, presence: true, length: {maximum: 140}
end
