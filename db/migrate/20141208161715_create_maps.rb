class CreateMaps < ActiveRecord::Migration
  def up
    create_table :maps do |t|
      t.string :name
      t.text :base_tiles, :limit => 4294967295
      t.text :base_top_tiles, :limit => 4294967295
      t.text :base_shadow, :limit => 4294967295
      t.text :base_mask, :limit => 4294967295
      t.integer :width ,default: 10
      t.integer :height ,default: 10
      t.string :tiles

      t.timestamps
    end
  end

  def down
    drop_table :maps
  end
end
