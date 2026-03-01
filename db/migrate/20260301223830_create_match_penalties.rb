class CreateMatchPenalties < ActiveRecord::Migration[8.1]
  def change
    create_table :match_penalties do |t|
      t.references :match, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: true
      t.string :penalty_type
      t.integer :minute
      t.text :description

      t.timestamps
    end
  end
end
