class CreateParticles < ActiveRecord::Migration
  def up
    create_table :particles do |t|
      t.string :name
      t.string :type
      t.integer :offset_x
      t.integer :offset_y
      t.float :spawn_time
      t.integer :max_particles
      t.boolean :unique_anim
      t.integer :floor_in
      t.float :create_random_hinit
      t.float :create_random_hend
      t.float :create_random_vinit
      t.float :create_random_vend
      t.float :velocity_random_hinit
      t.float :velocity_random_hend
      t.float :velocity_random_vinit
      t.float :velocity_random_vend
      t.integer :gravity_direction
      t.float :gravity
      t.float :alpha_init
      t.float :alpha_end
      t.float :size_init
      t.float :size_end
      t.float :max_life_init
      t.float :max_life_end
      t.string :color

      t.timestamps
    end
  end
  def down
    drop_table :particles
  end
end
