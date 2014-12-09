class CreateGameObjects < ActiveRecord::Migration
  def up
    create_table :game_objects do |t|
      t.integer :map_id
      t.text :options

      t.timestamps
    end
  end

  def down
    drop_table :game_objects
  end
end
