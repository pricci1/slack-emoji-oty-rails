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

ActiveRecord::Schema[8.0].define(version: 2025_03_08_233239) do
  create_table "emojis", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.integer "poll_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["poll_id"], name: "index_emojis_on_poll_id"
  end

  create_table "polls", force: :cascade do |t|
    t.string "owner_id"
    t.integer "votes_per_participant"
    t.string "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "votes", force: :cascade do |t|
    t.string "user_id"
    t.integer "poll_id", null: false
    t.integer "emoji_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["emoji_id"], name: "index_votes_on_emoji_id"
    t.index ["poll_id"], name: "index_votes_on_poll_id"
  end

  add_foreign_key "emojis", "polls"
  add_foreign_key "votes", "emojis"
  add_foreign_key "votes", "polls"
end
