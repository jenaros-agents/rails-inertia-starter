class MatchPenalty < ApplicationRecord
  # Associations
  belongs_to :match
  belongs_to :player

  # Validations
  validates :match, presence: true
  validates :player, presence: true
  validates :penalty_type, presence: true
  validates :minute, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 120 }, allow_nil: true
  validates :player_id, uniqueness: { scope: [ :match_id, :minute ] }

  # Scope
  scope :chronological, -> { order(:minute) }
end
