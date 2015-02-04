class AddColumnParrentPostIdToPosts < ActiveRecord::Migration
  def up
    add_column :posts, :parrent_id, :integer
    remove_column :posts, :title
  end

  def down
    add_column :posts, :title, :string
    remove_column :posts, :parrent_id
  end
end
