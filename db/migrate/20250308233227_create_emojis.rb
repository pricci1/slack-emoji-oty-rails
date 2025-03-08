class CreateEmojis < ActiveRecord::Migration[8.0]
  def change
    create_table :emojis do |t|
      t.string :name
      t.string :image
      t.references :poll, null: false, foreign_key: true

      t.timestamps
    end
  end
end
