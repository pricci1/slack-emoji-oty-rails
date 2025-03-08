class CreateVotes < ActiveRecord::Migration[8.0]
  def change
    create_table :votes do |t|
      t.string :user_id
      t.references :poll, null: false, foreign_key: true
      t.references :emoji, null: false, foreign_key: true

      t.timestamps
    end
  end
end
