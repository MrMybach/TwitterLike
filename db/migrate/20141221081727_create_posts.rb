class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :text, limit: 140
      t.timestamps
    end
  end
end
