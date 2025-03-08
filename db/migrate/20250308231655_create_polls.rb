class CreatePolls < ActiveRecord::Migration[8.0]
  def change
    create_table :polls do |t|
      t.string :owner_id
      t.integer :votes_per_participant
      t.string :team_id

      t.timestamps
    end
  end
end
