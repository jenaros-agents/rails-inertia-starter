class AddMatchToMatchStats < ActiveRecord::Migration[8.1]
  def change
    add_reference :match_stats, :match, null: true, foreign_key: true
  end
end
