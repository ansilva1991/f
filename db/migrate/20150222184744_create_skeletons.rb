class CreateSkeletons < ActiveRecord::Migration
  def change
    create_table :skeletons do |t|
      t.string :name
      t.text :joints

      t.timestamps
    end
  end
end
