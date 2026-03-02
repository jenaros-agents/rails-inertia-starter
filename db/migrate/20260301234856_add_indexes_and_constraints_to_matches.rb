class AddIndexesAndConstraintsToMatches < ActiveRecord::Migration[8.1]
  def change
    # Add index on matches.match_date for recent scope performance
    add_index :matches, :match_date

    # Add composite index on match_penalties(match_id, player_id) for query performance
    add_index :match_penalties, [ :match_id, :player_id ]

    # Add NOT NULL constraints for required fields in match_penalties
    change_column_null :match_penalties, :penalty_type, false

    # Add NOT NULL constraints for required fields in matches
    change_column_null :matches, :opponent, false
    change_column_null :matches, :match_date, false
    change_column_null :matches, :venue, false
  end
end
