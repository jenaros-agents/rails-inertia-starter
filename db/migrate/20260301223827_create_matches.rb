class CreateMatches < ActiveRecord::Migration[8.1]
  def change
    create_table :matches do |t|
      t.string :opponent
      t.datetime :match_date
      t.string :venue
      t.integer :home_score
      t.integer :away_score
      t.string :result
      t.string :youtube_url
      t.text :notes

      t.timestamps
    end
  end
end
