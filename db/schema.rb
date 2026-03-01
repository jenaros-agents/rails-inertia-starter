# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_03_01_223833) do
  create_table "gym_lifts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.date "date"
    t.string "lift_type"
    t.integer "player_id", null: false
    t.datetime "updated_at", null: false
    t.decimal "weight"
    t.index ["player_id"], name: "index_gym_lifts_on_player_id"
  end

  create_table "match_penalties", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "match_id", null: false
    t.integer "minute"
    t.string "penalty_type"
    t.integer "player_id", null: false
    t.datetime "updated_at", null: false
    t.index ["match_id"], name: "index_match_penalties_on_match_id"
    t.index ["player_id"], name: "index_match_penalties_on_player_id"
  end

  create_table "match_stats", force: :cascade do |t|
    t.integer "assists"
    t.integer "conversions"
    t.datetime "created_at", null: false
    t.integer "drops"
    t.integer "kicks"
    t.date "match_date"
    t.integer "match_id"
    t.integer "penalties"
    t.integer "player_id", null: false
    t.integer "tackles"
    t.integer "tries"
    t.datetime "updated_at", null: false
    t.index ["match_id"], name: "index_match_stats_on_match_id"
    t.index ["player_id"], name: "index_match_stats_on_player_id"
  end

  create_table "matches", force: :cascade do |t|
    t.integer "away_score"
    t.datetime "created_at", null: false
    t.integer "home_score"
    t.datetime "match_date"
    t.text "notes"
    t.string "opponent"
    t.string "result"
    t.datetime "updated_at", null: false
    t.string "venue"
    t.string "youtube_url"
  end

  create_table "players", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.decimal "height"
    t.string "name"
    t.text "notes"
    t.string "position"
    t.datetime "updated_at", null: false
    t.decimal "weight"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "versions", force: :cascade do |t|
    t.datetime "created_at"
    t.string "event", null: false
    t.bigint "item_id", null: false
    t.string "item_type", null: false
    t.text "object", limit: 1073741823
    t.string "whodunnit"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  add_foreign_key "gym_lifts", "players"
  add_foreign_key "match_penalties", "matches"
  add_foreign_key "match_penalties", "players"
  add_foreign_key "match_stats", "matches"
  add_foreign_key "match_stats", "players"
end
