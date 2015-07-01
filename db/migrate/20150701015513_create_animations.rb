class CreateAnimations < ActiveRecord::Migration
  def change
    create_table :animations do |t|
      t.string :name
      t.integer :step_per_frame
      t.text :frames, limit: 2147483647

      t.timestamps
    end
  end
end
