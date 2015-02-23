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

ActiveRecord::Schema.define(version: 20150222184744) do

  create_table "game_objects", force: true do |t|
    t.integer  "map_id"
    t.text     "options"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "maps", force: true do |t|
    t.string   "name"
    t.text     "base_tiles",     limit: 2147483647
    t.text     "base_top_tiles", limit: 2147483647
    t.text     "base_shadow",    limit: 2147483647
    t.text     "base_mask",      limit: 2147483647
    t.integer  "width",                             default: 10
    t.integer  "height",                            default: 10
    t.string   "tiles"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "particles", force: true do |t|
    t.string   "name"
    t.string   "particle_type"
    t.integer  "offset_x",                         default: 0
    t.integer  "offset_y",                         default: 0
    t.float    "spawn_time",            limit: 24, default: 0.0
    t.integer  "max_particles",                    default: 0
    t.boolean  "unique_anim",                      default: false
    t.integer  "floor_in",                         default: 0
    t.float    "create_random_hinit",   limit: 24, default: 0.0
    t.float    "create_random_hend",    limit: 24, default: 0.0
    t.float    "create_random_vinit",   limit: 24, default: 0.0
    t.float    "create_random_vend",    limit: 24, default: 0.0
    t.float    "velocity_random_hinit", limit: 24, default: 0.0
    t.float    "velocity_random_hend",  limit: 24, default: 0.0
    t.float    "velocity_random_vinit", limit: 24, default: 0.0
    t.float    "velocity_random_vend",  limit: 24, default: 0.0
    t.integer  "gravity_direction",                default: 270
    t.float    "gravity",               limit: 24, default: 0.0
    t.float    "alpha_init",            limit: 24, default: 0.0
    t.float    "alpha_end",             limit: 24, default: 0.0
    t.float    "size_init",             limit: 24, default: 0.0
    t.float    "size_end",              limit: 24, default: 0.0
    t.float    "max_life_init",         limit: 24, default: 0.0
    t.float    "max_life_end",          limit: 24, default: 0.0
    t.string   "color",                            default: "#000000"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "skeletons", force: true do |t|
    t.string   "name"
    t.text     "joints"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
