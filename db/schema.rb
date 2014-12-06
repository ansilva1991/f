# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141206222746) do

  create_table "particles", force: true do |t|
    t.string   "name"
    t.string   "type"
    t.integer  "offset_x"
    t.integer  "offset_y"
    t.float    "spawn_time",            limit: 24
    t.integer  "max_particles"
    t.boolean  "unique_anim"
    t.integer  "floor_in"
    t.float    "create_random_hinit",   limit: 24
    t.float    "create_random_hend",    limit: 24
    t.float    "create_random_vinit",   limit: 24
    t.float    "create_random_vend",    limit: 24
    t.float    "velocity_random_hinit", limit: 24
    t.float    "velocity_random_hend",  limit: 24
    t.float    "velocity_random_vinit", limit: 24
    t.float    "velocity_random_vend",  limit: 24
    t.integer  "gravity_direction"
    t.float    "gravity",               limit: 24
    t.float    "alpha_init",            limit: 24
    t.float    "alpha_end",             limit: 24
    t.float    "size_init",             limit: 24
    t.float    "size_end",              limit: 24
    t.float    "max_life_init",         limit: 24
    t.float    "max_life_end",          limit: 24
    t.string   "color"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
