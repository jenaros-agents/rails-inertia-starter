class MatchStat < ApplicationRecord
  # Associations
  belongs_to :player
  belongs_to :match, optional: true

  # Validations
  validates :match_date, presence: true
  validates :tries, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :tackles, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :assists, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :conversions, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :penalties, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :drops, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :kicks, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
