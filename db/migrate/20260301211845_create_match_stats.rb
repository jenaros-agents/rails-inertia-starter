class CreateMatchStats < ActiveRecord::Migration[8.1]
  def change
    create_table :match_stats do |t|
      t.references :player, null: false, foreign_key: true
      t.date :match_date
      t.integer :tries
      t.integer :tackles
      t.integer :assists
      t.integer :conversions
      t.integer :penalties
      t.integer :drops
      t.integer :kicks

      t.timestamps
    end
  end
end
