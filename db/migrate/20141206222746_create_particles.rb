class CreateParticles < ActiveRecord::Migration
  def up
    create_table :particles do |t|
      t.string :name
      t.string :type
      t.integer :offset_x, default: 0
      t.integer :offset_y, default: 0
      t.float :spawn_time, default: 0
      t.integer :max_particles, default: 0
      t.boolean :unique_anim, default: false
      t.integer :floor_in, default: 0
      t.float :create_random_hinit, default: 0
      t.float :create_random_hend, default: 0
      t.float :create_random_vinit, default: 0
      t.float :create_random_vend, default: 0
      t.float :velocity_random_hinit, default: 0
      t.float :velocity_random_hend, default: 0
      t.float :velocity_random_vinit, default: 0
      t.float :velocity_random_vend, default: 0
      t.integer :gravity_direction, default: 270
      t.float :gravity, default: 0
      t.float :alpha_init, default: 0
      t.float :alpha_end, default: 0
      t.float :size_init, default: 0
      t.float :size_end, default: 0
      t.float :max_life_init, default: 0
      t.float :max_life_end, default: 0
      t.string :color, default: "#000000"

      t.timestamps
    end
  end
  def down
    drop_table :particles
  end
end
